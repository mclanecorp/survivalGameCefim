import { GameStore } from '../GameStore';
import survivorIcon from '/survivor.svg';
import meatIcon from '/meat.svg';
import woodIcon from '/wood.svg';
import stoneIcon from '/stone.svg';

export function Ressources() {
    const resources = GameStore((state) => state.resources);

    return (
        <div className="bg-gray-300 rounded-lg mt-5 mb-5">
            <ul className="w-90 flex gap-20 ">
                <li className="flex ">
                    <img src={survivorIcon} alt="survivor"/>
                    <span className="mt-2 bg-white rounded flex items-center px-2 m">{resources.survivor}/{resources.survivor}</span>
                </li>
                <li className="flex gap-2">
                    <img src={meatIcon} alt="meat"/>
                    <span className="mt-2 bg-white rounded flex items-center px-2">{resources.meat}</span>
                </li>
                <li className="flex gap-2">
                    <img src={woodIcon} alt="wood"/>
                    <span className="mt-2 bg-white rounded flex items-center px-2">{resources.wood}</span>
                </li>
                <li className="flex gap-2">
                    <img src={stoneIcon} alt="stone"/>
                    <span className="mt-2 bg-white rounded flex items-center px-2">{resources.stone}</span>
                </li>
            </ul>
        </div>
    );
}