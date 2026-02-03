function BigYearProgress({ dayData }){
    let completedTasks = 0;
    let daysTracked = 0;

    Object.values(dayData).forEach((day) =>{
        if(day.study) completedTasks += 1;
        if(day.gym) completedTasks += 1;
        if(day.prep) completedTasks += 1;
        if(day.study || day.gym || day.prep){
            daysTracked += 1;
        }
    });

    const TOTAL_DAYS = 365;
    const TOTAL_TASKS = TOTAL_DAYS * 3;
    const progressPercent = (completedTasks / TOTAL_TASKS) * 100;

    return(
        <div className="big-year-progress">
            <h2>Overall Year Progress</h2>

            <div className="big-pie"
            style={{
                background:`conic-gradient(
            #1b6a03 ${progressPercent}%,
            #d7d9d7 ${progressPercent}%
          )`
            }}>
                <span className="big-percent">
                    {Math.round(progressPercent)}%
                </span>
            </div>

            <div className="year-stats">
                <div className="stat">
                    
                    <span className="stat-label">Completed Tasks :</span>
                    <span className="stat-value">{completedTasks}</span>
                </div>
                <div className="stat">
                    
                    <span className="stat-label">Total Tasks : </span>
                    <span className="stat-value">{TOTAL_TASKS}</span>
                </div>
                <div className="stat">
                    
                    <span className="stat-label">Days Tracked :</span>
                    <span className="stat-value">{daysTracked}</span>
                </div>
            </div>
        </div>      
    );
}

export default BigYearProgress;