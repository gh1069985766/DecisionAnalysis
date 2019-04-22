package com.decisionanalysis.project.modules.keyWord.service;

import com.decisionanalysis.framework.aspectj.lang.annotation.DataSource;
import com.decisionanalysis.framework.aspectj.lang.enums.DataSourceType;
import com.decisionanalysis.project.modules.keyWord.entity.KeyWordEntity;
import com.decisionanalysis.project.modules.keyWord.mapper.KeyWordMapper;
import com.decisionanalysis.project.modules.keyWord.service.IKeyWordService;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2019/3/29
 */
@Service("keyWordService")
public class KeyWordServiceImpl implements IKeyWordService {

    private static Logger logger = LoggerFactory.getLogger(KeyWordServiceImpl.class);


    @Autowired
    private KeyWordMapper keyWordMapper;

    @DataSource(value = DataSourceType.SLAVE)
    @Override
    public void save(KeyWordEntity keyWordEntity) {
        keyWordMapper.deleteKeyWordHistory();

        keyWordMapper.insertKeyWord(keyWordEntity);
    }

    @DataSource(value = DataSourceType.SLAVE)
    @Override
    public void saveAll(List<KeyWordEntity> keyWordEntityList) {
        keyWordMapper.deleteKeyWordHistory();
        for (KeyWordEntity k : keyWordEntityList) {
            keyWordMapper.insertKeyWord(k);
        }
        try {
            writeKeyWordToPy(keyWordEntityList);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @DataSource(value = DataSourceType.SLAVE)
    @Override
    public List<KeyWordEntity> selectKeyWordListByCondition(Map map) {
        return keyWordMapper.selectKeyWordListByCondition(map);
    }


    public void writeKeyWordToPy(List<KeyWordEntity> keyWordEntityList) throws Exception {

        File file = new File("/home/crawler/config.py");
        File newFile = new File("/home/crawler/confignew.py");
        if (!file.exists()) {
            logger.error("config.py不存在？！？！？！");
            return;
        }

        if (!file.exists()) {
            newFile.createNewFile();
        }

        FileOutputStream fileOutputStream = new FileOutputStream(newFile);
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream, "UTF-8");


        String rckeyWord = "";
        String cxkeyWord = "";
        String cykeyWord = "";

        for (KeyWordEntity keyWordEntity : keyWordEntityList) {
            if ("rc".equals(keyWordEntity.getBigTypeCode())) {
                String[] rcArr = keyWordEntity.getSmallType().split(",");
                rckeyWord = stringArrToStr(rcArr);
            }
            if ("cx".equals(keyWordEntity.getBigTypeCode())) {
                String[] cxArr = keyWordEntity.getSmallType().split(",");
                cxkeyWord = stringArrToStr(cxArr);
            }
            if ("cy".equals(keyWordEntity.getBigTypeCode())) {
                String[] cyArr = keyWordEntity.getSmallType().split(",");
                cykeyWord = stringArrToStr(cyArr);
            }
        }

        StringBuilder resultStr = new StringBuilder();

        InputStreamReader reader = new InputStreamReader(new FileInputStream(file), "UTF-8");
        BufferedReader bufferedReader = new BufferedReader(reader);
        String str = null;
        while (null != (str = bufferedReader.readLine())) {
            resultStr.append(str);
            if (str.indexOf("RC_KEY_WORDS_LIST") > -1) {
                outputStreamWriter.write("RC_KEY_WORDS_LIST=[" + rckeyWord + "]\r\n");
            } else if (str.indexOf("CX_KEY_WORDS_LIST") > -1) {
                outputStreamWriter.write("CX_KEY_WORDS_LIST=[" + cxkeyWord + "]\r\n");
            } else if (str.indexOf("CY_KEY_WORDS_LIST") > -1) {
                outputStreamWriter.write("CY_KEY_WORDS_LIST=[" + cykeyWord + "]\r\n");
            } else {
                outputStreamWriter.write(str + "\r\n");
            }
        }


        outputStreamWriter.flush();
        fileOutputStream.flush();
        outputStreamWriter.close();
        fileOutputStream.close();

        bufferedReader.close();

        reader.close();

        // 修改原文件为备份文件
//        File oldFile = new File("f:/11111/config.py");

        LocalDate localDateTime = LocalDate.now();
        File bakPYFile = new File("/home/crawler/configbak"+localDateTime.toString()+".py");
        FileUtils.copyFile(file, bakPYFile);
        file.delete();

        File newPyFile = new File("/home/crawler/config.py");
        FileUtils.copyFile(newFile, newPyFile);
        newFile.delete();


    }

    public String stringArrToStr(String[] arr) {
        String a = "";

        String str = "";
        for (int i = 0; i < arr.length; i++) {
            a += "'";
            a += arr[i];
            a += "'";
            str += a;
            if (i < arr.length - 1) {
                str += ",";
            }
            a = "";
        }
        return str;
    }
}
