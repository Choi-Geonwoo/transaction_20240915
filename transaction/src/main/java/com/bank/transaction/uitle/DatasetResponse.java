package com.bank.transaction.uitle;


import java.util.List;
import java.util.Map;

/**
* @packageName    : com.bank.transaction.uitle(단일 공통 데이터 응답 객체)
* @fileName       : DatasetResponse.java(단일 공통 데이터 응답 객체)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2025.03.28        Jihun Park       최초 생성
**/
public class DatasetResponse {
    private String datasetName;
    private List<Map<String, Object>> rows;

    public DatasetResponse(String datasetName, List<Map<String, Object>> rows) {
        this.datasetName = datasetName;
        this.rows = rows;
    }

    public String getDatasetName() {
        return datasetName;
    }

    public void setDatasetName(String datasetName) {
        this.datasetName = datasetName;
    }

    public List<Map<String, Object>> getRows() {
        return rows;
    }

    public void setRows(List<Map<String, Object>> rows) {
        this.rows = rows;
    }
}