package com.bank.transaction.uitle;

import java.util.List;

/**
* @packageName    : com.bank.transaction.uitle(다중 공통 데이터 응답 객체)
* @fileName       : MultiDatasetResponse.java(다중 공통 데이터 응답 객체)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2025.03.28        Jihun Park       최초 생성
**/
public class MultiDatasetResponse {
    private List<DatasetResponse> datasets;

    public MultiDatasetResponse(List<DatasetResponse> datasets) {
        this.datasets = datasets;
    }

    public List<DatasetResponse> getDatasets() {
        return datasets;
    }

    public void setDatasets(List<DatasetResponse> datasets) {
        this.datasets = datasets;
    }
}