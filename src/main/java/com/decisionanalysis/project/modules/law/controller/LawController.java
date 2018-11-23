package com.decisionanalysis.project.modules.law.controller;

import com.decisionanalysis.framework.web.controller.BaseController;
import com.decisionanalysis.framework.web.page.TableDataInfo;
import com.decisionanalysis.project.modules.law.entity.LawEntity;
import com.decisionanalysis.project.modules.law.service.ILawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

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
    public String toList() {
        return "modules/people/entrepreneurs";
    }

    @ResponseBody
    @RequestMapping(value = "/list")
    public TableDataInfo list() {
        startPage();
        List<LawEntity> lawEntityList = lawService.selectLawList(new LawEntity());
        return getDataTable(lawEntityList);
    }
}
