import React from 'react';
import { useTranslation } from 'react-i18next';
import fakeDashboardModules from '@/app/fakeData/DashboardModules';

import TaskIcon from '@mui/icons-material/Task';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import DescriptionIcon from '@mui/icons-material/Description';
import FlightIcon from '@mui/icons-material/Flight';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FeedbackIcon from '@mui/icons-material/Feedback';

const moduleIcons: Record<string, React.ReactNode> = {
    tasks: <TaskIcon fontSize="inherit" color="inherit" />,
    calendar: <CalendarTodayIcon fontSize="inherit" color="inherit" />,
    notes: <StickyNote2Icon fontSize="inherit" color="inherit" />,
    documents: <DescriptionIcon fontSize="inherit" color="inherit" />,
    trips: <FlightIcon fontSize="inherit" color="inherit" />,
    requests: <RequestPageIcon fontSize="inherit" color="inherit" />,
    substitutions: <SwapHorizIcon fontSize="inherit" color="inherit" />,
    feedbacks: <FeedbackIcon fontSize="inherit" color="inherit" />,
};

const Items: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] justify-items-center min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">
            <main className="grid grid-cols-4 gap-10 justify-center items-center">
                {fakeDashboardModules.map((module) => (
                    <div
                        key={module.uuid}
                        className="flex flex-col items-center justify-center w-24 h-24 sm:w-48 sm:h-48 rounded-full bg-[#34495e] hover:bg-[#2c3e50] transition-all shadow-lg cursor-pointer"
                    >
                        <div className="text-4xl sm:text-5xl text-white">{moduleIcons[module.name]}</div>
                        <span className="text-sm sm:text-base text-center mt-2 text-gray-200">
                            {t(`module.${module.name}`)}
                        </span>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Items;
