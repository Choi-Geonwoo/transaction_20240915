document.addEventListener("DOMContentLoaded", () => {
    // DOM이 모두 로드되면 캘린더 앱을 초기화
    new CalendarApp().init();
});

class CalendarApp {
    constructor() {
        const getById = id => document.getElementById(id);

        // 현재 연도, 월 초기화 (월은 0~11)
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();

        // DOM 요소 캐싱
        this.dom = {
            currentYearDisplay: getById("currentYear"),
            yearCalendarContainer: getById("yearCalendar"),
            currentMonthDisplay: getById("currentMonth"),
            monthCalendarContainer: getById("monthCalendar"),
            transactionTableBody: getById("tbody_00"),
            prevYearBtn: getById("prevYearBtn"),
            nextYearBtn: getById("nextYearBtn"),
            prevMonthBtn: getById("prevMonthBtn"),
            nextMonthBtn: getById("nextMonthBtn"),
        };

        // 버튼 이벤트 바인딩
        this.bindEventListeners();
    }

    /**
     * 캘린더 네비게이션 버튼 클릭 이벤트 등록
     */
    bindEventListeners() {
        const { prevYearBtn, nextYearBtn, prevMonthBtn, nextMonthBtn } = this.dom;
        prevYearBtn?.addEventListener('click', () => this.changeYear(-1));
        nextYearBtn?.addEventListener('click', () => this.changeYear(1));
        prevMonthBtn?.addEventListener('click', () => this.changeMonth(-1));
        nextMonthBtn?.addEventListener('click', () => this.changeMonth(1));
    }

    /**
     * 앱 초기화
     * - 연간/월간 달력 렌더링
     * - 데이터 fetch
     */
    async init() {
        this.renderYearCalendar();
        this.renderMonthCalendar();
        await this.fetchYearSummary();
        await this.fetchCalendarData();
    }

    // ------------------- 캘린더 렌더링 -------------------

    /**
     * 연간 달력 렌더링
     * @param {Object} monthData 월별 거래 수 (1~12)
     */
    renderYearCalendar(monthData = {}) {
        const { yearCalendarContainer, currentYearDisplay } = this.dom;
        currentYearDisplay.textContent = `${this.currentYear}년`;
        yearCalendarContainer.innerHTML = "";

        for (let month = 1; month <= 12; month++) {
            const monthDiv = document.createElement("div");
            monthDiv.className = "month";
            monthDiv.textContent = `${month}월`;

            const infoDiv = document.createElement("div");
            infoDiv.className = "info";
            //console.log(monthData[month]);
            const month_ = monthData[month];
            infoDiv.innerHTML = month_
                ? `${month_.count}건<br><br>합계 : ₩${month_.sum.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                : "";

            monthDiv.appendChild(infoDiv);

            // 클릭 시 해당 월 데이터 로드
            monthDiv.onclick = async () => {
                this.currentMonth = month - 1;
                await this.fetchCalendarData();
            };

            yearCalendarContainer.appendChild(monthDiv);
        }
    }

/**
 * 월간 달력 렌더링
 * @param {Object} dayData - 일별 { count, sum } 데이터
 */
renderMonthCalendar(dayData = {}) {
    const { monthCalendarContainer, currentMonthDisplay } = this.dom;
    currentMonthDisplay.textContent = `${this.currentYear}년 ${this.currentMonth + 1}월`;
    monthCalendarContainer.innerHTML = "";

    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // 빈칸 채우기
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "empty";
        monthCalendarContainer.appendChild(empty);
    }

    // 날짜별 셀 생성
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "date";
        dayCell.textContent = day;

        const infoDiv = document.createElement("div");
        infoDiv.className = "info";

        const data = dayData[day];
        if (data) {
            // 3자리 콤마 포맷
            const formattedSum = data.sum.toLocaleString();
            infoDiv.innerHTML = `${data.count}건<br>$${formattedSum}`;
        }

        dayCell.appendChild(infoDiv);

        // 클릭 시 해당 날짜 상세 조회
        dayCell.onclick = async () => this.fetchCalendarData(day);
        monthCalendarContainer.appendChild(dayCell);
    }
}

    /**
     * 거래 테이블 렌더링
     * @param {Object} json API 응답 데이터
     */
    renderTransactionTable(json) {
        const { transactionTableBody } = this.dom;
        transactionTableBody.innerHTML = "";

        const dataset = json.datasets?.find(d => d.datasetName === "stckClndSelect");
        const rows = dataset?.rows || [];

        if (!rows.length) {
            transactionTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">데이터가 없습니다.</td></tr>`;
            return;
        }

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
        transactionTableBody.appendChild(fragment);
    }

    // ------------------- 날짜 변경 -------------------

    /**
     * 연도 변경
     * @param {number} offset - 증가(+) / 감소(-)
     */
    async changeYear(offset) {
        this.currentYear += offset;
        await this.fetchYearSummary();
        await this.fetchCalendarData();
    }

    /**
     * 월 변경
     * @param {number} offset - 증가(+) / 감소(-)
     */
    async changeMonth(offset) {
        this.currentMonth += offset;

        // 연도 전환 처리
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
            await this.fetchYearSummary();
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
            await this.fetchYearSummary();
        }

        this.renderMonthCalendar();
        await this.fetchCalendarData();
    }

    // ------------------- 데이터 fetch -------------------

    /**
     * 거래 데이터 fetch
     * @param {number} [day] 선택된 일 (선택 시 일별)
     */
    async fetchCalendarData(day) {
        const dateParts = [this.currentYear, this.currentMonth + 1, day]
            .filter(Boolean)
            .map((v, i) => String(v).padStart(i === 1 || i === 2 ? 2 : 4, "0"));

        let type = "YYYY";
        if (dateParts[1]) type += "MM";
        if (dateParts[2]) type += "DD";

        const trnscdate = dateParts.slice(0, type.length / 2).join("-");

        try {
            const data = await this.fetchAPI(`/alctnClnd/stckClndSelect?${new URLSearchParams({
                trnscdate, type, yesr: this.currentYear
            })}`);
            this.handleFetchedCalendarData(data, type);
        } catch (e) {
            console.error(`Fetch calendar error (${type}):`, e);
        }
    }

    /**
     * 연간 요약 데이터 fetch
     */
    async fetchYearSummary() {
        try {
            const data = await this.fetchAPI(`/alctnClnd/stckClndSelect?${new URLSearchParams({
                trnscdate: this.currentYear, type: "YYYY", yesr: this.currentYear
            })}`);
            //console.log(data);
            this.renderYearCalendar(this.summarizeByMonth(data));
        } catch (e) {
            console.error(`Fetch year summary error:`, e);
        }
    }

    /**
     * fetch API 공통 함수
     */
    async fetchAPI(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    // ------------------- 데이터 처리 -------------------

    /**
     * API 응답 처리
     * @param {Object} data 응답 JSON
     * @param {string} type YYYY, YYYYMM, YYYYMMDD
     */
    handleFetchedCalendarData(data, type) {
        this.renderTransactionTable(data);

        // 월/연 단위 데이터일 경우 월간 달력 업데이트
        if (type === "YYYY" || type === "YYYYMM") {
            //console.log(data);
            this.renderMonthCalendar(this.summarizeByDay(data));
        }
    }

    /**
     * 일별 거래 수 요약
     */
    summarizeByDay(json) {
        const rows = json.datasets?.find(d => d.datasetName === "stckClndSelect")?.rows || [];
    
        return rows.reduce((acc, { TRNSCDATE, AMOUNT }) => {
            if (!TRNSCDATE) return acc;
            const day = Number(TRNSCDATE.split("-")[2]);
            if (isNaN(day)) return acc;
    
            const amount = Number(AMOUNT) || 0;
            if (!acc[day]) acc[day] = { count: 0, sum: 0 };
    
            acc[day].count += 1;
            acc[day].sum += amount;
    
            return acc;
        }, {});
    }

    /**
     * 월별 거래 수 요약
     */
    summarizeByMonth(json) {
        const rows = json.datasets?.find(d => d.datasetName === "stckClndSelect")?.rows || [];
        return rows.reduce((acc, { TRNSCDATE, AMOUNT }) => {
            if (!TRNSCDATE) return acc;
            const month = Number(TRNSCDATE.split("-")[1]);
            //if (!isNaN(month)) acc[month] = (acc[month] || 0) + 1;
            if (isNaN(month)) return acc;
            
            const amount = Number(AMOUNT) || 0;
            if (!acc[month]) acc[month] = { count: 0, sum: 0 };
            //console.log("amount : " + amount);
            

            acc[month].count += 1;
            //console.log(amount)
            acc[month].sum += amount;
            
            return acc;
        }, {});
    }
}
