import { GameStore } from '../GameStore';

export function Ressources() {
    const resources = GameStore((state) => state.resources);

    return (
        <div className="bg-gray-300 rounded-lg mt-5 mb-5">
            <ul className="w-90 flex gap-20 ">
                <li className="flex ">
                    <img src="/survivor.svg" alt=""/>
                    <span className="mt-2 bg-white rounded flex items-center px-2 m">{resources.survivor}/{resources.survivor}</span>
                </li>
                <li className="flex gap-2">
                    <img src="/meat.svg" alt=""/>
                    <span className="mt-2 bg-white rounded flex items-center px-2">{resources.meat}</span>
                </li>
                <li className="flex gap-2">
                    <img src="/wood.svg" alt=""/>
                    <span className="mt-2 bg-white rounded flex items-center px-2">{resources.wood}</span>
                </li>
                <li className="flex gap-2">
                    <img src="/stone.svg" alt=""/>
                    <span className="mt-2 bg-white rounded flex items-center px-2">{resources.stone}</span>
                </li>
            </ul>
        </div>
    );
}