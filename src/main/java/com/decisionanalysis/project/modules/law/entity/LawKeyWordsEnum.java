package com.decisionanalysis.project.modules.law.entity;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/12/18
 */
public enum  LawKeyWordsEnum {
    RC_KEYWORD("rc_key_words", "rc_key_words"),
    CY_KEYWORD("cy_key_words", "cy_key_words"),
    CX_KEYWORD("cx_key_words", "cx_key_words");

    private String keyWordsName;
    private String keyWordsColumn;

    LawKeyWordsEnum(String keyWordsName, String keyWordsColumn) {
        this.keyWordsName = keyWordsName;
        this.keyWordsColumn = keyWordsColumn;
    }

    public String getKeyWordsName() {
        return keyWordsName;
    }

    public String getKeyWordsColumn() {
        return keyWordsColumn;
    }

    /**
     *
     * @param keyWordsColumn
     * @return
     */
    public static String getKeyWordsNameForQuery(String keyWordsColumn) {
        for (LawKeyWordsEnum lawKeyWordsEnum : LawKeyWordsEnum.values()) {
            if (keyWordsColumn.equals(lawKeyWordsEnum.keyWordsColumn)) {
                return lawKeyWordsEnum.keyWordsName;
            }
        }
        return null;
    }
}
