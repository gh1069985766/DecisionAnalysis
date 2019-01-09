package com.decisionanalysis.project.modules.law.entity;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/12/18
 */
public enum LawTableEnum {
    RC_TABLE("rc_feature_dict_dd", "rc_feature_dict_dd"),
    CX_TABLE("cx_feature_dict_dd", "cx_feature_dict_dd"),
    CY_TABLE("cy_feature_dict_dd", "cy_feature_dict_dd");

    private String tableName;
    private String tableColumn;

    LawTableEnum(String tableName, String tableColumn) {
        this.tableColumn = tableColumn;
        this.tableName = tableName;
    }

    public String getTableName() {
        return tableName;
    }

    public String getTableColumn() {
        return tableColumn;
    }

    /**
     * 根据传值返回表名  虽然值一样 但是这样可以防止sql注入
     * @param tableColumn
     * @return
     */
    public static String getTableNameForQuery(String tableColumn) {
        for (LawTableEnum lawTableEnum : LawTableEnum.values()) {
            if (tableColumn.equals(lawTableEnum.tableColumn)) {
                return lawTableEnum.tableName;
            }
        }
        return null;
    }


}
