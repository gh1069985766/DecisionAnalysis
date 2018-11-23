package com.decisionanalysis.project.modules.law.service;

import com.decisionanalysis.project.modules.law.entity.LawEntity;
import com.decisionanalysis.project.modules.law.mapper.LawMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<LawEntity> selectLawList(LawEntity lawEntity) {
        return lawMapper.selectLawList(lawEntity);
    }
}
