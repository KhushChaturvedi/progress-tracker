import { useState, useEffect } from "react";

function DayModal({ day, onClose, onSave, existingData }) {

    const [study, setStudy] = useState(false);
    const [gym, setGym] = useState(false);
    const [prep, setPrep] = useState(false);

    useEffect(() => {
        if (existingData) {
            setStudy(existingData.study);
            setGym(existingData.gym);
            setPrep(existingData.prep);
        } else {
            setStudy(false);
            setGym(false);
            setPrep(false);
        }
    }, [existingData]);

    function handleSave() {
        onSave(day, {
            study: study,
            gym: gym,
            prep: prep
        });
        onClose();
    }

    const completedCount =
        (prep ? 1 : 0) +
        (study ? 1 : 0) +
        (gym ? 1 : 0);

    const progressPercent = (completedCount / 3) * 100;

    return (
        <div className="modal-overlay">
            <div className="modal">

                <h3>Day {day}</h3>

                <div className="toggle-group">
                    <button
                        className={study ? "active" : ""}
                        onClick={() => setStudy(!study)}
                    >
                        Study
                    </button>

                    <button
                        className={gym ? "active" : ""}
                        onClick={() => setGym(!gym)}
                    >
                        Gym
                    </button>

                    <button
                        className={prep ? "active" : ""}
                        onClick={() => setPrep(!prep)}
                    >
                        Prep
                    </button>
                </div>

                <div className="progress-wrapper">
                    <div
                        className="progress-circle"
                        style={{
                            background: `conic-gradient(
                                #4caf50 ${progressPercent}%,
                                #e0e0e0 ${progressPercent}%
                            )`
                        }}
                    >
                        <span className="progress-text">
                            {Math.round(progressPercent)}%
                        </span>
                    </div>
                </div>

                <button onClick={handleSave}>Save & Close</button>

            </div>
        </div>
    );
}

export default DayModal;
