import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

export function Quests({ quests: initialQuests }) {
    const [isOpen, setIsOpen] = useState(false);
    const [quests, setQuests] = useState(initialQuests);

    // Fonction pour obtenir les quêtes à afficher
    const displayedQuests = useMemo(() => {
        const lastCompletedQuest = [...quests]
            .reverse()
            .find(quest => quest.completed);

        // 3 premiere
        if (!lastCompletedQuest) {
            return quests
                .filter(quest => !quest.completed)
                .slice(0, 3);
        }

        // sinon derniere valider et 2 suivantes
        const questsList = [];
        let foundLastCompleted = false;
        let nextQuestsCount = 0;

        for (const quest of quests) {
            if (quest.id === lastCompletedQuest.id) {
                questsList.push(quest);
                foundLastCompleted = true;
            } else if (foundLastCompleted && !quest.completed && nextQuestsCount < 2) {
                questsList.push(quest);
                nextQuestsCount++;
            }
        }

        return questsList;
    }, [quests]);

    const activeQuestsCount = quests.filter(q => !q.completed).length;

    const handleQuestClick = (questId) => {
        setQuests(quests.map(quest => 
            quest.id === questId 
                ? { ...quest, completed: !quest.completed }
                : quest
        ));
    };

    return (
        <div className="bg-white rounded-lg">
            <div 
                className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-xl font-bold">Quêtes disponibles ({activeQuestsCount})</h2>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl"
                >
                    ▼
                </motion.span>
            </div>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 space-y-3">
                            {displayedQuests.map(quest => (
                                <motion.div 
                                    key={quest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="border p-3 rounded-lg bg-gray-50 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => handleQuestClick(quest.id)}
                                >
                                    <h3 className="font-semibold">{quest.title}</h3>
                                    <p className="text-gray-600 text-xs mt-1">{quest.description}</p>
                                    <div className="mt-2 text-green-600 text-xs">
                                        <span className="font-bold">Récompense:</span> {quest.reward}
                                    </div>
                                    <div className="mt-2">
                                        <span className={`text-xs px-2 py-1 rounded ${quest.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {quest.completed ? 'Validée' : 'À valider'}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}