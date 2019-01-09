package com.decisionanalysis.project.modules.law.controller;

import ch.qos.logback.classic.db.names.TableName;
import com.decisionanalysis.framework.web.controller.BaseController;
import com.decisionanalysis.framework.web.page.TableDataInfo;
import com.decisionanalysis.project.modules.law.entity.*;
import com.decisionanalysis.project.modules.law.service.ILawService;
import org.apache.commons.collections4.Put;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/11/1
 */
@Controller
@RequestMapping(value = "/law")
public class LawController extends BaseController {
    @Autowired
    private ILawService lawService;

    @RequestMapping(value = "toList")
    public String toList(@RequestParam(value = "type",required = false) String type,
                         @RequestParam(value = "bigType", required = false) String bigType,
                         Model model) {
        model.addAttribute("type", type);
        model.addAttribute("bigType", bigType);
        return "modules/law/lawList";
    }


    /**
     *
     * @param areaName 区域
     * @param title 标题
     * @param keyWords 关键词
     * @param rank 区级文件，区府文件 等政策文件范围
     * @param bigType 大类（人才， 创新， 产业）
     * @param type  人才：创业扶持、办公补贴、生活津贴、人才招聘、薪金补助
     * 科技创新：研发补助
     * 产业：工业、服务业、高端制造、税收、地价、租金
     * @param startDate 开始时间
     * @param endDate 结束时间
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/list")
    public TableDataInfo list(@RequestParam(value = "areaName", required = false) String areaName,
                              @RequestParam(value = "title", required = false) String title,
                              @RequestParam(value = "keyWords", required = false) String keyWords,
                              @RequestParam(value = "rank", required = false) String rank,
                              @RequestParam(value = "bigType", required = false) String bigType,
                              @RequestParam(value = "type", required = false) String type,
                              @RequestParam(value = "startDate", required = false) String startDate,
                              @RequestParam(value = "endDate", required = false) String endDate,
                              @RequestParam(value = "orderBy", required = false)String orderBy) {
        startPage();
        Map map = new HashMap(8);
        map.put("areaName", areaName);
        map.put("title", title);
        map.put("keyWords", keyWords);
        map.put("rank", rank);
        map.put("bigType", bigType);
        map.put("type", type);
        map.put("startDate", startDate);
        map.put("endDate", endDate);
        map.put("orderBy", orderBy);
        List<LawEntity> lawEntityList = lawService.selectLawList(map);
        return getDataTable(lawEntityList);
    }


    @ResponseBody
    @RequestMapping(value = "/selectLawListByDynamic")
    public TableDataInfo selectLawListByDynamic(@RequestParam(value = "keyColumn") String keyColumn,
                                                @RequestParam(value = "similarityColumn") String similarityColumn,
                                                @RequestParam(value = "tableName") String tableName) {
//        startPage();
        String tableNameValue = LawTableEnum.getTableNameForQuery(tableName);
        String keyColumnValue = LawKeyWordsEnum.getKeyWordsNameForQuery(keyColumn);
        String similarityColumnValue = LawSimilarityColumnEnum.getSimilarityColumnNameForQuery(similarityColumn);
        String orderByType = "date";
        Map map = new HashMap();
        map.put("keyColumn", keyColumnValue);
        map.put("similarityColumn", similarityColumnValue);
        map.put("tableName", tableNameValue);
        map.put("orderByType", orderByType);
        List<LawEntity> lawEntityList = new ArrayList<>();
        if (tableNameValue != null && keyColumnValue != null && similarityColumnValue != null) {
            lawEntityList = lawService.selectLawListByDynamic(map);
        }
        return getDataTable(lawEntityList);

    }

    @ResponseBody
    @RequestMapping(value = "/selectAllListByCondition")
    public Map selectAllListByCondition(@RequestParam(value = "areaName", required = false) String region,
                                        @RequestParam(value = "title", required = false) String title,
                                        @RequestParam(value = "rank", required = false) String rank,
                                        @RequestParam(value = "bigType", required = false) String bigType,
                                        @RequestParam(value = "type", required = false) String type,
                                        @RequestParam(value = "startDate", required = false) String startDate,
                                        @RequestParam(value = "endDate", required = false) String endDate,
                                        @RequestParam(value = "orderBy", required = false)String orderBy,
                                        @RequestParam(value = "pageSize") int pageSize,
                                        @RequestParam(value = "pageNum") int pageNum) {
        int pageStart = pageSize * (pageNum - 1);
        Map map = new HashMap(16);
        if (region.isEmpty()) {
            map.put("region", null);
        } else {
            map.put("region", "'" + region + "'");
        }
        if (title.isEmpty()) {
            map.put("title", null);
        } else {
            map.put("title", "'"+title+"'");
        }
        if (startDate.isEmpty()) {
            map.put("startDate", null);
        } else {
            map.put("startDate", "'"+startDate+"'");
        }

        if (endDate.isEmpty()) {
            map.put("endDate", null);
        } else {
            map.put("endDate", "'"+endDate+"'");
        }

        map.put("type", bigType);
        if (type == null) {
            map.put("similarityColumn", null);
        } else {
            map.put("similarityColumn", LawSimilarityColumnEnum.getSimilarityColumnNameForQuery(type));
        }

        map.put("orderByType", orderBy);
        map.put("pageStart", pageStart);
        map.put("pageSize", pageSize);
        List<LawAllEntity> lawAllEntities = lawService.selectAllListByCondition(map);
        int total = lawService.selectAllListByConditionTotal(map);
        Map result = new HashMap(4);
        result.put("code", "0");
        result.put("rows", lawAllEntities);
        result.put("total", total);
        return result;
    }

    @RequestMapping(value = "/showContent/{id}")
    public String showContent(@PathVariable("id") Integer id, Model model) {
        Map<String, String> map = lawService.selectTitleAndPathAndKeyById(id);

        model.addAttribute("title", map.get("title"));
        model.addAttribute("keyWords", map.get("keyWords"));
        model.addAttribute("body", getBodyStr(map.get("body_path")) + "<a target='view_window' href='"+map.get("url")+"'>------------原文件地址--------------</a>");
//        model.addAttribute("body", getBodyStr("F:/test/t20170112_1074479.html"));
        return "modules/law/showContent";
    }

    private String getBodyStr(String filePath) {
        StringBuffer buffer = null;
        InputStream fis = null;
        BufferedReader reader = null;
        try {
            buffer = new StringBuffer();
            fis = new FileInputStream(filePath);
            reader = new BufferedReader(new InputStreamReader(fis,"UTF-8"));
            String line = null;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            reader.close();
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        return buffer.toString();
    }
}
