package com.decisionanalysis.project.modules.keyWord.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.decisionanalysis.common.utils.StringUtils;
import com.decisionanalysis.framework.web.controller.BaseController;
import com.decisionanalysis.project.modules.keyWord.entity.KeyWordEntity;
import com.decisionanalysis.project.modules.keyWord.service.IKeyWordService;
import com.decisionanalysis.project.monitor.job.task.ExecPyThread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2019/4/1
 */
@Controller
@RequestMapping(value = "/keyWord")
public class KeyWordController extends BaseController {

    @Autowired
    private IKeyWordService keyWordService;

    @RequestMapping("/form")
    public String keyWordForm(Model model) {
        Map map = new HashMap();
        List<KeyWordEntity> list = keyWordService.selectKeyWordListByCondition(map);
        model.addAttribute("keyWords", JSONObject.toJSONString(list));
        return "modules/keyWord/form";
    }

    @ResponseBody
    @RequestMapping("/save")
    public Map save(@RequestParam(value = "keyWord") String keyWord) {
        JSONObject jsonObject = JSONObject.parseObject(keyWord);
        JSONArray rcJsonArray = jsonObject.getJSONArray("rcData");
        JSONArray cxJsonArray = jsonObject.getJSONArray("cxData");
        JSONArray cyJsonArray = jsonObject.getJSONArray("cyData");
        String rcStr = "";
        String cxStr = "";
        String cyStr = "";
        for (int i=0; i < rcJsonArray.size() ; i++) {
            JSONObject jsonObject1 = (JSONObject) rcJsonArray.get(i);
            if (!StringUtils.isEmpty(jsonObject1.getString("value"))) {
                rcStr += jsonObject1.getString("value");
                if (i != rcJsonArray.size() - 1) {
                    rcStr += ",";
                }
            }
        }
        for (int i=0; i < cxJsonArray.size() ; i++) {
            JSONObject jsonObject1 = (JSONObject) cxJsonArray.get(i);
            if (!StringUtils.isEmpty(jsonObject1.getString("value"))) {
                cxStr += jsonObject1.getString("value");
                if (i != cxJsonArray.size() - 1) {
                    cxStr += ",";
                }
            }
        }
        for (int i=0; i < cyJsonArray.size() ; i++) {
            JSONObject jsonObject1 = (JSONObject) cyJsonArray.get(i);
            if (!StringUtils.isEmpty(jsonObject1.getString("value"))) {
                cyStr += jsonObject1.getString("value");
                if (i != cyJsonArray.size() - 1) {
                    cyStr += ",";
                }
            }

        }
        KeyWordEntity keyWordEntity1 = new KeyWordEntity();
        keyWordEntity1.setBigType("人才");
        keyWordEntity1.setBigTypeCode("rc");
        keyWordEntity1.setSmallType(rcStr);
        keyWordEntity1.setCreatedBy(getUserId().toString());
        KeyWordEntity keyWordEntity2 = new KeyWordEntity();
        keyWordEntity2.setBigType("创新");
        keyWordEntity2.setBigTypeCode("cx");
        keyWordEntity2.setSmallType(cxStr);
        keyWordEntity2.setCreatedBy(getUserId().toString());
        KeyWordEntity keyWordEntity3 = new KeyWordEntity();
        keyWordEntity3.setBigType("产业");
        keyWordEntity3.setBigTypeCode("cy");
        keyWordEntity3.setSmallType(cyStr);
        keyWordEntity3.setCreatedBy(getUserId().toString());
        List list = new ArrayList();
        list.add(keyWordEntity1);
        list.add(keyWordEntity2);
        list.add(keyWordEntity3);
        Map map = new HashMap();
        try {
            keyWordService.saveAll(list);
            map.put("status", "0");
        } catch (Exception e) {
            map.put("status", "1");
        }

        return map;
    }


    @ResponseBody
    @RequestMapping("/execPy")
    public Map execPy() {
        Map m = new HashMap();
        try {
            ExecPyThread thread = new ExecPyThread();
            thread.start();
            m.put("status", "0");
            return m;
        } catch (Exception e) {
            e.printStackTrace();
            m.put("status", "1");
            return m;
        }



    }
}
