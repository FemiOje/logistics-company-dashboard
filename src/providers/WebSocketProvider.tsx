import { ReactNode, useState, useEffect, useCallback } from "react";
import { DashboardStats, RecentUpdate, WebSocketMessage, Shipment } from "../types/types";
import { WebSocketContext } from "../contexts/WebSocketContext";

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalShipments: 0,
    in_transit: 0,
    delayed: 0,
    delivered: 0,
    shipments: shipments
  });
  const [recentUpdates, setRecentUpdates] = useState<RecentUpdate[]>([]);
  const [wsInstance, setWsInstance] = useState<WebSocket | null>(null);

  const updateStatsAndHistory = useCallback((message: WebSocketMessage) => {
    setStats((prevStats) => {
      const newStats = { ...prevStats };

      switch (message.type) {
        case "SHIPMENT_CREATED":
          newStats.totalShipments++;
          newStats[message.data.status as keyof DashboardStats]++;
          break;
        case "SHIPMENT_DELETED":
          newStats.totalShipments--;
          break;
        case "SHIPMENT_UPDATE":
          if (message.data.oldStatus && message.data.newStatus) {
            newStats[message.data.oldStatus as keyof DashboardStats]--;
            newStats[message.data.newStatus as keyof DashboardStats]++;
          }
          break;
      }
      return newStats;
    });

    if (message.type !== "CONNECTION_ACK") {
      setRecentUpdates((prev) => {
        const update = createRecentUpdate(message);
        return [update, ...prev.slice(0, 9)];
      });
    }
  }, []);

  const createRecentUpdate = (message: WebSocketMessage): RecentUpdate => {
    let updateMessage: string;
    let shipmentId: string;

    switch (message.type) {
      case "SHIPMENT_CREATED":
        shipmentId = message.data.shipmentId;
        updateMessage = `New shipment from ${message.data.origin.address} to ${message.data.destination.address}`;
        break;
      case "SHIPMENT_DELETED":
        shipmentId = message.data.shipmentId;
        updateMessage = `Shipment ${shipmentId} removed`;
        break;
      case "SHIPMENT_UPDATE":
        shipmentId = message.data.shipmentId;
        updateMessage = `Status changed to ${message.data.newStatus}`;
        break;
      default:
        shipmentId = "SYSTEM";
        updateMessage = "System update";
    }

    return {
      id: Date.now().toString(),
      type: message.type,
      shipmentId,
      timestamp: new Date().toISOString(),
      update: updateMessage,
    };
  };

  const handleMessage = useCallback(
    (message: WebSocketMessage) => {
      switch (message.type) {
        case "SHIPMENT_CREATED":
          setShipments((prev) => [...prev, message.data]);
          break;
        case "SHIPMENT_DELETED":
          setShipments((prev) => prev.filter((s) => s.shipmentId !== message.data.shipmentId));
          break;
        case "SHIPMENT_UPDATE":
          setShipments((prev) =>
            prev.map((s) =>
              s.shipmentId === message.data.shipmentId
                ? {
                    ...s,
                    status: message.data.newStatus,
                    lastUpdated: message.data.timestamp,
                  }
                : s
            )
          );
          break;
      }

      updateStatsAndHistory(message);
    },
    [updateStatsAndHistory]
  );

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setWsInstance(ws);
    };

    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        handleMessage(message);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setWsInstance(null);
    };

    return () => {
      ws.close();
    };
  }, [handleMessage]);

  const sendMessage = useCallback(
    (message: string) => {
      if (wsInstance && wsInstance.readyState === WebSocket.OPEN) {
        wsInstance.send(message);
      } else {
        console.error("WebSocket is not connected");
      }
    },
    [wsInstance]
  );

  return (
    <WebSocketContext.Provider value={{ shipments, stats, recentUpdates, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};