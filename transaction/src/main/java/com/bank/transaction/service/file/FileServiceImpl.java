package com.bank.transaction.service.file;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
    * @methodName    : fileSelect(파일 조회)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */    
    @Override
    public FileDTO fileSelect(String no) {
        return fileMapper.fileSelect(no);
    }

    /**
    * @methodName    : fileInsert(파일 등록)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */    
    @Override
    public int fileInsert(FileDTO fDto) {
        return fileMapper.fileInsert(fDto);
    }

    /**
    * @methodName    : fileUpdate(파일 수정)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */    
    @Override
    public int fileUpdate(FileDTO fDto) {
        return fileUpdate(fDto);
    }
    @Override
    public ByteArrayOutputStream excelDownload(List<Map<String, Object>> data, String[] headers) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Sheet sheet = workbook.createSheet("Sheet1");

            // Unicode 지원 폰트 및 스타일 설정
            CellStyle cellStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setFontName("Arial Unicode MS");
            cellStyle.setFont(font);

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

                    if (value == null) {
                        cell.setCellValue("");
                    } else if (value instanceof String) {
                        cell.setCellValue((String) value);
                    } else if (value instanceof Number) {
                        cell.setCellValue(((Number) value).doubleValue());
                    } else {
                        cell.setCellValue(value.toString());
                    }
                }
            }

            workbook.write(out);

        } finally {
            workbook.close();
        }

        return out;
    }



}
