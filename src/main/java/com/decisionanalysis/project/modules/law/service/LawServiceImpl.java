package com.decisionanalysis.project.modules.law.service;

import com.decisionanalysis.framework.aspectj.lang.annotation.DataSource;
import com.decisionanalysis.framework.aspectj.lang.enums.DataSourceType;
import com.decisionanalysis.project.modules.law.entity.LawEntity;
import com.decisionanalysis.project.modules.law.mapper.LawMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/11/1
 */

@Service("lawService")
public class LawServiceImpl implements ILawService {

    @Autowired
    private LawMapper lawMapper;

    @DataSource(value = DataSourceType.SLAVE)
    @Override
    public List<LawEntity> selectLawList(Map map) {
        return lawMapper.selectLawList(map);
    }

    @DataSource(value = DataSourceType.SLAVE)
    @Override
    public Map<String, String> selectTitleAndPathAndKeyById(int id) {
        Map map = new HashMap(2);
        map.put("id", id);
        return lawMapper.selectTitleAndPathAndKeyById(map);
    }
}
