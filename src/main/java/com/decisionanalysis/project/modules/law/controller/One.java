package com.decisionanalysis.project.modules.law.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/11/1
 */
@Controller
@RequestMapping("/one")
public class One {

    @RequestMapping(value = "/showOne")
    public String showOne() {
        return "modules/showOne";
    }
}
