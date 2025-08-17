document.addEventListener("DOMContentLoaded", () => {
    // Initialize the calendar application when the DOM is fully loaded.
    const app = new CalendarApp();
    app.init();
});

/**
 * Represents the main calendar application, managing state and rendering.
 */
class CalendarApp {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth(); // 0-based (Jan = 0)

        // Cache DOM elements for efficient access.
        this.dom = {
            currentYearDisplay: document.getElementById("currentYear"),
            yearCalendarContainer: document.getElementById("yearCalendar"),
            currentMonthDisplay: document.getElementById("currentMonth"),
            monthCalendarContainer: document.getElementById("monthCalendar"),
            transactionTableBody: document.getElementById("tbody_00"),
            
            // New: Cache navigation buttons
            prevYearBtn: document.getElementById("prevYearBtn"),
            nextYearBtn: document.getElementById("nextYearBtn"),
            prevMonthBtn: document.getElementById("prevMonthBtn"),
            nextMonthBtn: document.getElementById("nextMonthBtn"),
        };

        // Bind event handlers to the class instance to ensure 'this' context is correct.
        // These are only for methods that will be directly used as event listeners.
        // monthDiv.onclick and dayCell.onclick are closures so 'this' context is maintained.
        this.attachEventListeners(); // Call a new method to attach all listeners
    }

    /**
     * Attaches all necessary event listeners to the DOM elements.
     */
    attachEventListeners() {
        if (this.dom.prevYearBtn) this.dom.prevYearBtn.addEventListener('click', () => this.changeYear(-1));
        if (this.dom.nextYearBtn) this.dom.nextYearBtn.addEventListener('click', () => this.changeYear(1));
        if (this.dom.prevMonthBtn) this.dom.prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
        if (this.dom.nextMonthBtn) this.dom.nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
    }

    /**
     * Initializes the calendar application by rendering initial views and fetching data.
     */
    async init() {
        // Render initial empty calendars. Data will populate them after fetch.
        this.renderYearCalendar();
        this.renderMonthCalendar();

        // Fetch initial data. Await ensures these complete before subsequent actions relying on them.
        await this.fetchYearSummary(this.currentYear);
        await this.fetchCalendarData(this.currentYear, this.currentMonth);
    }

    /**
     * Renders the year calendar with transaction counts per month.
     * @param {Object} monthDataMap - Optional: An object mapping month numbers (1-12) to transaction counts.
     */
    renderYearCalendar(monthDataMap = {}) {
        this.dom.currentYearDisplay.textContent = `${this.currentYear}년`;
        this.dom.yearCalendarContainer.innerHTML = ""; // Clear existing content

        for (let month = 1; month <= 12; month++) {
            const monthDiv = document.createElement("div");
            monthDiv.classList.add("month");
            monthDiv.textContent = `${month}월`;

            const infoDiv = document.createElement("div");
            infoDiv.classList.add("info");
            const dataCount = monthDataMap[month] || 0;
            infoDiv.textContent = dataCount > 0 ? `${dataCount}건` : "";
            monthDiv.appendChild(infoDiv);

            // Attach click handler to update current month and fetch data
            monthDiv.onclick = async () => {
                this.currentMonth = month - 1; // Adjust to 0-based index
                // Fetch data for the selected month and update views accordingly.
                await this.fetchCalendarData(this.currentYear, this.currentMonth);
                // Note: renderMonthCalendar is called by handleFetchedCalendarData.
            };

            this.dom.yearCalendarContainer.appendChild(monthDiv);
        }
    }

    /**
     * Renders the monthly calendar grid with transaction counts per day.
     * @param {Object} dayDataMap - Optional: An object mapping day numbers (1-31) to transaction counts.
     */
    renderMonthCalendar(dayDataMap = {}) {
        this.dom.currentMonthDisplay.textContent = `${this.currentYear}년 ${this.currentMonth + 1}월`;
        this.dom.monthCalendarContainer.innerHTML = ""; // Clear existing content

        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay(); // Day of week (0=Sun, 6=Sat)
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate(); // Last day of current month

        // Add empty cells for days preceding the 1st of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("empty");
            this.dom.monthCalendarContainer.appendChild(emptyCell);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("date");
            dayCell.textContent = day;

            const infoDiv = document.createElement("div");
            infoDiv.classList.add("info");
            const dataCount = dayDataMap[day] || 0;
            infoDiv.textContent = dataCount > 0 ? `${dataCount}건` : "";
            dayCell.appendChild(infoDiv);

            // Attach click handler to fetch specific day's data
            dayCell.onclick = async () => {
                // When a day is clicked, only the transaction list is updated;
                // the monthly calendar view remains as is.
                await this.fetchCalendarData(this.currentYear, this.currentMonth, day);
            };

            this.dom.monthCalendarContainer.appendChild(dayCell);
        }
    }

    /**
     * Changes the current year and triggers a re-fetch of relevant data.
     * @param {number} offset - The amount to change the year by (e.g., 1 for next, -1 for previous).
     */
    async changeYear(offset) {
        this.currentYear += offset;
        await this.fetchYearSummary(this.currentYear); // Update year summary
        await this.fetchCalendarData(this.currentYear, this.currentMonth); // Fetch data for current month of new year
        // Note: renderMonthCalendar is called by handleFetchedCalendarData.
    }

    /**
     * Changes the current month, handling year transitions, and triggers a re-fetch of data.
     * @param {number} offset - The amount to change the month by (e.g., 1 for next, -1 for previous).
     */
    async changeMonth(offset) {
        this.currentMonth += offset;

        // Handle year transitions (e.g., December to January, January to December)
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
            await this.fetchYearSummary(this.currentYear); // Year changed, update year summary
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
            await this.fetchYearSummary(this.currentYear); // Year changed, update year summary
        }

        // Render monthly calendar immediately for smooth UI, then fetch data to populate counts
        this.renderMonthCalendar();
        await this.fetchCalendarData(this.currentYear, this.currentMonth);
    }

    /**
     * Fetches calendar transaction data from the API based on the specified date granularity.
     * @param {number} year - The year for the data request.
     * @param {number} [month] - Optional: The 0-based month.
     * @param {number} [day] - Optional: The 1-based day.
     */
    async fetchCalendarData(year, month, day) {
        let trnscdate = String(year);
        let type = "YYYY";

        if (month !== undefined && month !== null) {
            trnscdate += `-${String(month + 1).padStart(2, "0")}`;
            type += "MM";
        }
        if (day !== undefined && day !== null) {
            trnscdate += `-${String(day).padStart(2, "0")}`;
            type += "DD";
        }

        const params = new URLSearchParams({
            trnscdate,
            type,
            yesr: year, // `yesr` might be a specific backend requirement, keeping it.
        });

        try {
            const data = await this.fetchAPI(`/alctnClnd/stckClndSelect?${params}`);
            this.handleFetchedCalendarData(data, type);
        } catch (error) {
            console.error(`Error fetching calendar data for ${type}:`, error);
            // Consider displaying a user-friendly error message on the UI.
        }
    }

    /**
     * Fetches transaction summary data for a given year to populate the yearly calendar.
     * @param {number} year - The year to summarize.
     */
    async fetchYearSummary(year) {
        const params = new URLSearchParams({
            trnscdate: year,
            type: "YYYY",
            yesr: year,
        });

        try {
            const data = await this.fetchAPI(`/alctnClnd/stckClndSelect?${params}`);
            const monthMap = this.summarizeByMonth(data);
            this.renderYearCalendar(monthMap); // Only render year calendar here.
        } catch (error) {
            console.error(`Error fetching year summary for ${year}:`, error);
        }
    }

    /**
     * Generic asynchronous utility to fetch JSON data from an API endpoint.
     * @param {string} url - The URL to fetch from.
     * @returns {Promise<Object>} A promise that resolves with the parsed JSON data.
     * @throws {Error} If the network response is not OK.
     */
    async fetchAPI(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} from ${url}`);
        }
        return await response.json();
    }

    /**
     * Handles the received transaction data, rendering the table and conditionally the month calendar.
     * @param {Object} data - The JSON data received from the API.
     * @param {string} dataType - The type of data fetched (e.g., "YYYY", "YYYYMM", "YYYYMMDD").
     */
    handleFetchedCalendarData(data, dataType) {
        this.renderTransactionTable(data);

        // Re-render monthly calendar with new day counts only if fetching year or month-level data.
        // For day-specific clicks, the monthly calendar view remains unchanged.
        if (dataType === "YYYY" || dataType === "YYYYMM" || dataType === "YYYY-MM") {
            const dayMap = this.summarizeByDay(data);
            this.renderMonthCalendar(dayMap);
        }
    }

    /**
     * Renders the detailed transaction list into the HTML table.
     * @param {Object} json - The JSON data containing transaction records.
     */
    renderTransactionTable(json) {
        this.dom.transactionTableBody.innerHTML = ""; // Clear existing table rows

        const dataset = json.datasets?.find(d => d.datasetName === "stckClndSelect");
        const rows = dataset?.rows || [];

        if (rows.length === 0) {
            this.dom.transactionTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">데이터가 없습니다.</td></tr>`;
            return;
        }

        // Use DocumentFragment for performance when appending multiple rows
        const fragment = document.createDocumentFragment();
        rows.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row['TRNSCDATE']}</td>
                <td>${row['STOCK_NAME']}</td>
                <td>${row['TIKER']}</td>
                <td>${row['AMOUNT']}</td>
            `;
            fragment.appendChild(tr);
        });
        this.dom.transactionTableBody.appendChild(fragment);
    }

    /**
     * Summarizes the number of transactions per day from the fetched data.
     * @param {Object} json - The JSON data from the API.
     * @returns {Object} A map where keys are day numbers and values are transaction counts.
     */
    summarizeByDay(json) {
        const dataset = json.datasets?.find(d => d.datasetName === "stckClndSelect");
        const rows = dataset?.rows || [];

        const summary = {};
        rows.forEach(row => {
            const date = row["TRNSCDATE"];
            if (date) {
                const day = Number(date.split("-")[2]); // Extract day part (e.g., "25")
                if (!isNaN(day)) {
                    summary[day] = (summary[day] || 0) + 1;
                }
            }
        });
        return summary;
    }

    /**
     * Summarizes the number of transactions per month from the fetched data.
     * @param {Object} json - The JSON data from the API.
     * @returns {Object} A map where keys are month numbers and values are transaction counts.
     */
    summarizeByMonth(json) {
        const dataset = json.datasets?.find(d => d.datasetName === "stckClndSelect");
        const rows = dataset?.rows || [];

        const summary = {};
        rows.forEach(row => {
            const date = row["TRNSCDATE"];
            if (date) {
                const month = Number(date.split("-")[1]); // Extract month part (e.g., "07")
                if (!isNaN(month)) {
                    summary[month] = (summary[month] || 0) + 1;
                }
            }
        });
        return summary;
    }
}