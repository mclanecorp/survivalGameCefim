// Settings.jsx
import { Button } from "../components/Button.jsx";
import { useNavigate } from 'react-router-dom';

export function Settings() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold mb-8">Settings</h1>
                <div className="flex flex-col gap-4">
                    <Button
                        title="Back"
                        color="bg-gradient-to-r from-blue-600 to-blue-500"
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>
        </div>
    );
}