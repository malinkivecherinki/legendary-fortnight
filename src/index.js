// Scheduler - Job scheduling and task runner
class Scheduler {
    constructor() {
        this.jobs = new Map();
        this.running = false;
    }
    
    schedule(name, task, interval) {
        this.jobs.set(name, { task, interval, lastRun: null });
    }
    
    async run(name) {
        const job = this.jobs.get(name);
        if (!job) return;
        
        job.lastRun = new Date();
        await job.task();
    }
    
    start() {
        this.running = true;
        this.jobs.forEach((job, name) => {
            setInterval(() => {
                if (this.running) {
                    this.run(name);
                }
            }, job.interval);
        });
    }
    
    stop() {
        this.running = false;
    }
}

module.exports = Scheduler;
