package com.bank.transaction.service.file;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.file.dto.FileDTO;
import com.bank.transaction.mapper.file.FileMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    /**
     * 파일 조회
     */
    @Override
    public FileDTO fileSelect(String no) {
        return fileMapper.fileSelect(no);
    }

    /**
     * 파일 등록
     */
    @Override
    public int fileInsert(FileDTO fDto) {
        return fileMapper.fileInsert(fDto);
    }

    /**
     * 파일 수정 (무한 재귀 버그 수정)
     */
    @Override
    public int fileUpdate(FileDTO fDto) {
        return fileMapper.fileUpdate(fDto);
    }

    /**
     * Excel 다운로드 기능
     */
    @Override
    public ByteArrayOutputStream excelDownload(List<Map<String, Object>> data, String[] headers) throws IOException {
        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Sheet1");

            // Unicode 지원 폰트 및 스타일 설정
            CellStyle cellStyle = createDefaultCellStyle(workbook);

            // Header 및 데이터 채우기
            populateSheetData(sheet, data, headers, cellStyle);

            workbook.write(out);
            return out;
        }
    }

    /**
     * 기본 CellStyle 생성
     */
    private CellStyle createDefaultCellStyle(Workbook workbook) {
        CellStyle cellStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Arial Unicode MS");
        cellStyle.setFont(font);
        return cellStyle;
    }

    /**
     * 엑셀 Sheet에 데이터 입력
     */
    private void populateSheetData(Sheet sheet, List<Map<String, Object>> data, String[] headers, CellStyle cellStyle) {
        // Header 작성
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(cellStyle);
        }

        // 데이터 작성
        for (int rowNum = 0; rowNum < data.size(); rowNum++) {
            Row row = sheet.createRow(rowNum + 1);
            Map<String, Object> rowData = data.get(rowNum);

            for (int colNum = 0; colNum < headers.length; colNum++) {
                Cell cell = row.createCell(colNum);
                Object value = rowData.get(headers[colNum]);
                cell.setCellStyle(cellStyle);

                setCellValue(cell, value);
            }
        }
    }

    /**
     * 셀 값 설정 (데이터 타입에 따라 처리)
     */
    private void setCellValue(Cell cell, Object value) {
        if (value == null) {
            cell.setCellValue("");
        } else if (value instanceof String) {
            cell.setCellValue((String) value);
        } else if (value instanceof Number) {
            cell.setCellValue(((Number) value).doubleValue());
        } else if (value instanceof BigDecimal) {
            cell.setCellValue(((BigDecimal) value).doubleValue());
        } else {
            cell.setCellValue(value.toString());
        }
    }
}
