import React from "react";
import { ChevronDown } from "lucide-react";
import "./Announce.css";
import AnnouncementCard from "../../components/AnnouncementCard";

const Announce = () => {
    return (
        
        <div className="announces-container">
            <h1 className="announces-title">
                Stay informed about the latest events
            </h1>
            <p className="announces-subtitle">
                Programs, trainings, jobs, and meet-ups! Can be weddings and
                baby showers too!! Don't miss out!
            </p>
            <AnnouncementCard />

            <div className="down-arrow">
                <ChevronDown size={32} />
            </div>
        </div>
    );
};

export default Announce;
