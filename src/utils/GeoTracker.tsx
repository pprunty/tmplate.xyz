import React, { useEffect, ReactNode, useCallback } from 'react';

export interface GeoPositionModel {
    latitude: number;
    longitude: number;
}

interface GeoTrackerProps {
    children?: ReactNode;
    isAuthenticated: boolean;
    isLoading?: boolean; // Optional, if needed
}

// Mocked sendLocationData function
const sendLocationData = async (pos: GeoPositionModel): Promise<void> => {
    return new Promise((resolve) => {
        console.log("Mock: Location data sent:", pos);
        resolve();
    });
};

const GeoTracker: React.FC<GeoTrackerProps> = React.memo(({ children, isAuthenticated }) => {
    const handleSuccess = useCallback(async (position: GeolocationPosition) => {
        const pos: GeoPositionModel = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };

        try {
            await sendLocationData(pos);
            console.log("Location data sent successfully.");
        } catch (error) {
            console.error("Error in sending location data:", error);
        }
    }, []);

    const handleError = useCallback((error: GeolocationPositionError) => {
        console.error("Error in geolocation:", error);
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("User not authenticated, skipping geolocation.");
            return;
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [isAuthenticated, handleSuccess, handleError]);

    return <div>{children}</div>;
});

// Add a displayName for React.memo
GeoTracker.displayName = "GeoTracker";

export default GeoTracker;
