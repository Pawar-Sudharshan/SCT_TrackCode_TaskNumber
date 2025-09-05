
        class Stopwatch {
            constructor() {
                this.startTime = null;
                this.elapsedTime = 0;
                this.isRunning = false;
                this.lapTimes = [];
                this.updateInterval = null;
                
                this.timeDisplay = document.getElementById('timeDisplay');
                this.startBtn = document.getElementById('startBtn');
                this.lapBtn = document.getElementById('lapBtn');
                this.lapContainer = document.getElementById('lapContainer');
                this.statsDisplay = document.getElementById('statsDisplay');
            }
            
            formatTime(seconds) {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
                const wholeSeconds = Math.floor(secs);
                const milliseconds = Math.floor((secs - wholeSeconds) * 1000);
                
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${wholeSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
            }
            
            start() {
                if (this.startTime === null) {
                    this.startTime = Date.now() - this.elapsedTime * 1000;
                } else {
                    this.startTime = Date.now() - this.elapsedTime * 1000;
                }
                
                this.isRunning = true;
                this.startBtn.textContent = 'PAUSE';
                this.startBtn.className = 'btn pause-btn';
                this.lapBtn.disabled = false;
                
                this.updateInterval = setInterval(() => this.updateDisplay(), 10);
                this.updateStats('Stopwatch is running...');
            }
            
            pause() {
                this.isRunning = false;
                this.elapsedTime = (Date.now() - this.startTime) / 1000;
                
                clearInterval(this.updateInterval);
                
                this.startBtn.textContent = 'START';
                this.startBtn.className = 'btn start-btn';
                this.lapBtn.disabled = true;
                this.updateStats('Stopwatch paused');
            }
            
            reset() {
                this.isRunning = false;
                this.startTime = null;
                this.elapsedTime = 0;
                this.lapTimes = [];
                
                clearInterval(this.updateInterval);
                
                this.timeDisplay.textContent = '00:00:00.000';
                this.startBtn.textContent = 'START';
                this.startBtn.className = 'btn start-btn';
                this.lapBtn.disabled = true;
                
                this.displayLapTimes();
                this.updateStats('Stopwatch reset - Ready to start!');
            }
            
            recordLap() {
                if (this.isRunning) {
                    const currentTime = (Date.now() - this.startTime) / 1000;
                    const lapTime = this.lapTimes.length > 0 
                        ? currentTime - this.lapTimes[this.lapTimes.length - 1].totalTime
                        : currentTime;
                    
                    const lapData = {
                        lapNumber: this.lapTimes.length + 1,
                        lapTime: lapTime,
                        totalTime: currentTime,
                        timestamp: new Date().toLocaleTimeString()
                    };
                    
                    this.lapTimes.push(lapData);
                    this.displayLapTimes();
                    this.updateStats(`Lap ${lapData.lapNumber} recorded`);
                }
            }
            
            displayLapTimes() {
                if (this.lapTimes.length === 0) {
                    this.lapContainer.innerHTML = `
                        <div style="text-align: center; color: #bdc3c7; padding: 20px;">
                            No lap times recorded yet
                        </div>
                    `;
                    return;
                }
                
                let html = '';
                this.lapTimes.forEach(lap => {
                    html += `
                        <div class="lap-item">
                            <span>Lap ${lap.lapNumber}</span>
                            <span>${this.formatTime(lap.lapTime)}</span>
                            <span>${this.formatTime(lap.totalTime)}</span>
                            <span>${lap.timestamp}</span>
                        </div>
                    `;
                });
                
                this.lapContainer.innerHTML = html;
                this.lapContainer.scrollTop = this.lapContainer.scrollHeight;
                
                if (this.lapTimes.length > 1) {
                    const fastestLap = this.lapTimes.reduce((min, lap) => 
                        lap.lapTime < min.lapTime ? lap : min
                    );
                    const slowestLap = this.lapTimes.reduce((max, lap) => 
                        lap.lapTime > max.lapTime ? lap : max
                    );
                    const avgLapTime = this.lapTimes.reduce((sum, lap) => 
                        sum + lap.lapTime, 0
                    ) / this.lapTimes.length;
                    
                    const statsText = `Laps: ${this.lapTimes.length} | Fastest: ${this.formatTime(fastestLap.lapTime)} | Slowest: ${this.formatTime(slowestLap.lapTime)} | Average: ${this.formatTime(avgLapTime)}`;
                    this.updateStats(statsText);
                }
            }
            
            updateDisplay() {
                if (this.isRunning && this.startTime) {
                    this.elapsedTime = (Date.now() - this.startTime) / 1000;
                    this.timeDisplay.textContent = this.formatTime(this.elapsedTime);
                }
            }
            
            updateStats(message) {
                this.statsDisplay.textContent = message;
            }
        }
        
        // Initialize the stopwatch
        const stopwatch = new Stopwatch();
        
        // Global functions for button clicks
        function toggleStopwatch() {
            if (stopwatch.isRunning) {
                stopwatch.pause();
            } else {
                stopwatch.start();
            }
        }
        
        function recordLap() {
            stopwatch.recordLap();
        }
        
        function resetStopwatch() {
            stopwatch.reset();
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'Space':
                    event.preventDefault();
                    toggleStopwatch();
                    break;
                case 'KeyL':
                    event.preventDefault();
                    if (!stopwatch.lapBtn.disabled) {
                        recordLap();
                    }
                    break;
                case 'KeyR':
                    event.preventDefault();
                    resetStopwatch();
                    break;
            }
        });
   