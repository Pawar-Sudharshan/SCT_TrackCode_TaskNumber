# Advanced Stopwatch - User Friendly  
[GitHub Link](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_2#advanced-stopwatch---user-friendly)  
![Project Screenshot](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/blob/main/SCT_WD_2/asserts/screenshot.jpg)

## Overview  
The **Advanced Stopwatch** is a user-friendly, modern web application built using **HTML, CSS, and JavaScript**. It provides precise time tracking functionality including start, pause, reset, and lap time recording along with detailed lap statistics. The UI is clean, responsive, and easy to navigate.

## Features  
- ✅ Start/Pause toggle with a single button  
- ✅ Reset functionality to clear all times and laps  
- ✅ Record lap times with timestamps and cumulative totals  
- ✅ Display of fastest, slowest, and average lap times  
- ✅ Real-time stopwatch display with millisecond precision (HH:MM:SS.mmm)  
- ✅ Keyboard shortcuts for quick control:  
  - Space: Start/Pause  
  - L: Record Lap  
  - R: Reset  
- ✅ Responsive and visually clean design  

## How to Use  
1. Open the `index.html` file in any modern web browser.  
2. Click **START** to begin the stopwatch.  
3. Click **LAP** to record lap times while running.  
4. Click **PAUSE** or press the **Space** key to pause timing.  
5. Click **RESET** or press **R** to clear the stopwatch and laps.  
6. Lap times and statistics appear below the control buttons.

## Project Structure  
SCT_WD_2/
│
├── index.html # Main HTML file with stopwatch layout
├── style.css # CSS styles for the application
├── script.js # JavaScript logic for stopwatch and UI updates
├── assets/ # Images or other media files


## Code Overview  
- Contains a `Stopwatch` class managing all timing, lap recording, and display updates.  
- Uses `setInterval` to update display every 10 milliseconds for precision.  
- Lap data stored in an array with lap number, individual/lap time, total elapsed time, and timestamp.  
- Dynamically calculates and displays lap statistics (fastest, slowest, average).  
- Button text and state change depending on whether the stopwatch is running or paused.

## Browser Compatibility  
Compatible with all modern browsers including **Chrome, Firefox, Edge, and Safari**. Fully responsive on both desktop and mobile devices.

## Author  
**Pawar Sudharshan**  
GitHub: [github.com/Pawar-Sudharshan](https://github.com/Pawar-Sudharshan)  
Email: [pawarsudharshan47@gmail.com](mailto:pawarsudharshan47@gmail.com)

## License  
This project is **open source** and free to use, modify, and distribute.
