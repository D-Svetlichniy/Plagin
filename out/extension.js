"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.showCalendar', () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const calendar = generateCalendar(currentMonth, currentYear, daysInMonth, firstDayOfMonth);
        showCalendar(calendar);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function generateCalendar(month, year, daysInMonth, firstDayOfMonth) {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let calendar = '';
    calendar += `${month + 1}/${year}\n`;
    calendar += weekdays.join(' ') + '\n';
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
        let row = '';
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
                row += '   ';
            }
            else {
                const day = dayCounter.toString().padStart(2, ' ');
                row += day + ' ';
                dayCounter++;
            }
        }
        calendar += row.trim() + '\n';
        if (dayCounter > daysInMonth) {
            break;
        }
    }
    return calendar;
}
function showCalendar(calendar) {
    const panel = vscode.window.createWebviewPanel('calendar', 'Calendar', vscode.ViewColumn.One, {});
    panel.webview.html = `
        <html>
        <body>
            <pre>${calendar}</pre>
        </body>
        </html>
    `;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map