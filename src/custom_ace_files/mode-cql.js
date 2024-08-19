import ace from 'ace-builds/src-noconflict/ace'

ace.define("ace/mode/matching_brace_outdent",[], function(require, exports, module){"use strict";
var Range = require("../range").Range;
var MatchingBraceOutdent = function () { };
(function () {
    this.checkOutdent = function (line, input) {
        if (!/^\s+$/.test(line))
            return false;
        return /^\s*\}/.test(input);
    };
    this.autoOutdent = function (doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);
        if (!match)
            return 0;
        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({ row: row, column: column });
        if (!openBracePos || openBracePos.row == row)
            return 0;
        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column - 1), indent);
    };
    this.$getIndent = function (line) {
        return line.match(/^\s*/)[0];
    };
}).call(MatchingBraceOutdent.prototype);
exports.MatchingBraceOutdent = MatchingBraceOutdent;

});

ace.define("ace/mode/json_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var JsonHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "variable", // single line
                regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
            }, {
                token: "string", // single line
                regex: '"',
                next: "string"
            }, {
                token: "constant.numeric", // hex
                regex: "0[xX][0-9a-fA-F]+\\b"
            }, {
                token: "constant.numeric", // float
                regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token: "constant.language.boolean",
                regex: "(?:true|false)\\b"
            }, {
                token: "text", // single quoted strings are not allowed
                regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token: "comment", // comments are not allowed, but who cares?
                regex: "\\/\\/.*$"
            }, {
                token: "comment.start", // comments are not allowed, but who cares?
                regex: "\\/\\*",
                next: "comment"
            }, {
                token: "paren.lparen",
                regex: "[[({]"
            }, {
                token: "paren.rparen",
                regex: "[\\])}]"
            }, {
                token: "punctuation.operator",
                regex: /[,]/
            }, {
                token: "text",
                regex: "\\s+"
            }
        ],
        "string": [
            {
                token: "constant.language.escape",
                regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                defaultToken: "string"
            }
        ],
        "comment": [
            {
                token: "comment.end", // comments are not allowed, but who cares?
                regex: "\\*\\/",
                next: "start"
            }, {
                defaultToken: "comment"
            }
        ]
    };
};
oop.inherits(JsonHighlightRules, TextHighlightRules);
exports.JsonHighlightRules = JsonHighlightRules;

});

ace.define("ace/mode/json5_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var JsonHighlightRules = require("./json_highlight_rules").JsonHighlightRules;
var Json5HighlightRules = function () {
    JsonHighlightRules.call(this);
    var startRules = [{
            token: "variable",
            regex: /[a-zA-Z$_\u00a1-\uffff][\w$\u00a1-\uffff]*\s*(?=:)/
        }, {
            token: "variable",
            regex: /['](?:(?:\\.)|(?:[^'\\]))*?[']\s*(?=:)/
        }, {
            token: "constant.language.boolean",
            regex: /(?:null)\b/
        }, {
            token: "string",
            regex: /'/,
            next: [{
                    token: "constant.language.escape",
                    regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,
                    consumeLineEnd: true
                }, {
                    token: "string",
                    regex: /'|$/,
                    next: "start"
                }, {
                    defaultToken: "string"
                }]
        }, {
            token: "string",
            regex: /"(?![^"]*":)/,
            next: [{
                    token: "constant.language.escape",
                    regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,
                    consumeLineEnd: true
                }, {
                    token: "string",
                    regex: /"|$/,
                    next: "start"
                }, {
                    defaultToken: "string"
                }]
        }, {
            token: "constant.numeric",
            regex: /[+-]?(?:Infinity|NaN)\b/
        }];
    for (var key in this.$rules)
        this.$rules[key].unshift.apply(this.$rules[key], startRules);
    this.normalizeRules();
};
oop.inherits(Json5HighlightRules, JsonHighlightRules);
exports.Json5HighlightRules = Json5HighlightRules;

});

ace.define("ace/mode/cql_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var Json5HighlightRules = require("./json5_highlight_rules").Json5HighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var CQLHighlightRules = function () {
    var aggregateFunctions = ("COUNT|MIN|MAX|SUM|CAST|AVG");
    var scalarFunctions = ("cast|token|uuid|now|min_timeuuid|max_timeuuid|current_timestamp|current_date|current_time|" +
        "current_time|to_date|to_timestamp|to_unix_timestamp|abs|exp|log|log10|round|map_keys|map_values|" +
        "collection_count|collection_min|collection_max|collection_sum|collection_avg|similarity_cosine|" +
        "similarity_euclidean|similarity_dot_product");
    var allFunctions = aggregateFunctions + "|" + scalarFunctions;
    var reservedKeywords = ("ADD|ALLOW|ALTER|AND|APPLY|ASC|AUTHORIZE|BATCH|BEGIN|BY|COLUMNFAMILY|CREATE|" +
        "DELETE|DESC|DESCRIBE|DROP|ENTRIES|EXECUTE|FROM|FULL|GRANT|IF|IN|INDEX|INFINITY|INSERT|INTO|KEYSPACE|LIMIT|" +
        "MODIFY|NAN|NORECURSIVE|NOT|NULL|OF|ON|OR|ORDER|PRIMARY|RENAME|REPLACE|REVOKE|SCHEMA|SELECT|SET|TABLE|TO|" +
        "TOKEN|TRUNCATE|UNLOGGED|UPDATE|USE|USING|WHERE|WITH");
    var adjustedReservedKeywords = ("ADD|ALLOW|ALTER|AND|APPLY|ASC|AUTHORIZE|BATCH|BEGIN|BY|COLUMNFAMILY|CREATE|" +
        "CREATE TABLE|DELETE|DESC|DESCRIBE|DROP TABLE|DROP KEYSPACE|DROP|ENTRIES|EXECUTE|FROM|FULL|GRANT|IF|IN|INDEX|INFINITY|" +
        "INSERT|INTO|KEYSPACE|LIMIT|MODIFY|NAN|NORECURSIVE|NOT|NULL|OF|ON|OR|ORDER|PRIMARY|PRIMARY KEY|RENAME|REPLACE|REVOKE|" +
        "SCHEMA|SELECT|SET|TABLE|TO|TOKEN|TRUNCATE TABLE|TRUNCATE|UNLOGGED|UPDATE|USE|USING|WHERE|WITH");
    var selectOperators = ("IN|CONTAINS KEY|CONTAINS");
    var selectDependentKeywords = ("AS|FROM|WHERE|GROUP BY|ORDER BY|PER PARTITION LIMIT|LIMIT|ALLOW FILTERING" +
        selectOperators);
    var insertDependentKeywords = ("EXISTS|VALUES|DEFAULT|UNSET");
    var nonReservedKeywords = ("AGGREGATE|ALL|AS|ASCII|BIGINT|BLOB|BOOLEAN|CALLED|CLUSTERING|COMPACT|CONTAINS|COUNT|" +
        "COUNTER|CUSTOM|DATE|DECIMAL|DISTINCT|DOUBLE|EXISTS|FILTERING|FINALFUNC|FLOAT|FLOAT|FUNCTION|FUNCTIONS|INET|" +
        "INITCOND|INPUT|INT|JSON|KEY|KEYS|KEYSPACES|LANGUAGE|LIST|LOGIN|MAP|MASKED|NOLOGIN|NOSUPERUSER|OPTIONS|" +
        "PASSWORD|PERMISSION|PERMISSIONS|RETURNS|ROLE|ROLES|SELECT_MASKED|SFUNC|SMALLINT|STATIC|STORAGE|STYPE|" +
        "SUPERUSER|TEXT|TIME|TIMESTAMP|TIMEUUID|TINYINT|TRIGGER|TTL|TUPLE|TYPE|UNMASK|USER|USERS|UUID|VALUES|VARCHAR|" +
        "VARINT|WRITETIME|MAXWRITETIME");
    var dataTypes = ("ASCII|BIGINT|BLOB|BOOLEAN|COUNTER|DATE|DECIMAL|DOUBLE|DURATION|FLOAT|INET|INT|" +
        "SMALLINT|TEXT|TIME|TIMESTAMP|TIMEUUID|TINYINT|UUID|VARCHAR|VARINT|VECTOR");
    var expressions = ("ALL|CASE|COUNT|ELSE|END|EXISTS|THEN|WHEN|" +
        "CONSTRAINT|CREATE|DROP|EXISTS|INDEX|NODE|KEY|UNIQUE|INDEX|JOIN|SCAN|USING");
    var operators = ("AND|AS|CONTAINS|DISTINCT|ENDS|IN|IS|NOT|OR|STARTS|XOR");
    var dataDefinitionConstants = ("PRIMARY KEY|STATIC");
    var dataManipulationConstants = ("JSON|DISTINCT");
    var create_keyspace_options = ("replication|durable_writes");
    var create_table_options = ("CLUSTERING ORDER BY|COMMENT|SPECULATIVE_RETRY|CDC|ADDITIONAL_WRITE_POLICY|" +
        "GC_GRACE_SECONDS|BLOOM_FILTER_FP_CHANCE|DEFAULT_TIME_TO_LIVE|COMPACTION|COMPRESSION|CACHING|" +
        "MEMTABLE_FLUSH_PERIOD_IN_MS|READ_REPAIR");
    var alter_table_options = ("COMMENT|SPECULATIVE_RETRY|CDC|ADDITIONAL_WRITE_POLICY|" +
        "GC_GRACE_SECONDS|BLOOM_FILTER_FP_CHANCE|DEFAULT_TIME_TO_LIVE|COMPACTION|COMPRESSION|CACHING|" +
        "MEMTABLE_FLUSH_PERIOD_IN_MS|READ_REPAIR");
    var updateParameter = ("TIMESTAMP|TTL");
    var functionRegex = "\\b(" + allFunctions + ")\\b";
    var dataTypeRegex = "\\b(" + dataTypes + ")\\b";
    var adjustedReservedKeywordRegex = "\\b(" + adjustedReservedKeywords + ")\\b";
    var createKeyspaceRegex = "\\b(" + create_keyspace_options + ")\\b";
    var createTableRegex = "\\b(" + create_table_options + ")\\b";
    var alterTableRegex = "\\b(" + alter_table_options + ")\\b";
    var updateParameterRegex = "\\b(" + updateParameter + ")\\b";
    var dataDefinitionRegex = "\\b(" + dataDefinitionConstants + ")\\b";
    var dataManipulationRegex = "\\b(" + dataManipulationConstants + ")\\b";
    var selectDependentKeywordsRegex = "\\b(" + selectDependentKeywords + ")\\b";
    var insertDependentKeywordsRegex = "\\b(" + insertDependentKeywords + ")\\b";
    var basicDataHighlighting = [
        {
            token: 'constant.language.datatype', // decimal integers and floats
            regex: dataTypeRegex,
            caseInsensitive: true
        },
        {
            token: "comment",
            regex: "\\/\\/.*$|\\-\\-.*$"
        },
        {
            token: "comment.start", // multi-line comment
            regex: "\\/\\*",
            push: [
                {
                    token: "comment.end",
                    regex: "\\*\\/",
                    next: "pop"
                }, {
                    defaultToken: "comment"
                }
            ]
        },
        {
            token: "string", // single line string
            regex: /(["'])(?:(?=(\\?))\2.)*?\1/
        },
        {
            token: 'constant.numeric', // hexadecimal, octal and binary
            regex: /\b0[xX][0-9a-fA-F]+\b|\b0[oO][0-7]+\b|\b0[bB][01]+\b/
        }, {
            token: 'constant.numeric', // decimal integers and floats
            regex: "(?<!-)\\b\\d+(\\.\\d+)?\\b(?!-)"
        },
        {
            token: "support.function",
            regex: functionRegex + "(\\S?|\\s|\\n)(?=\\()",
            caseInsensitive: true
        }
    ];
    this.$rules = {
        "start": [
            basicDataHighlighting,
            {
                token: "keyword",
                regex: "CREATE KEYSPACE|ALTER KEYSPACE",
                next: "create_or_alter_keyspace_state",
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: "CREATE TABLE",
                next: "create_table_state",
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: "ALTER TABLE",
                next: "alter_table_state",
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: "SELECT",
                next: "select_state",
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: "INSERT INTO",
                next: "insert_state",
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: "UPDATE",
                next: "update_state",
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: "DELETE",
                next: "delete_state",
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "constant.language", // single line string
                regex: dataDefinitionRegex
            }
        ],
        "select_state": [
            basicDataHighlighting,
            {
                token: "constant.language", // single line string
                regex: dataManipulationRegex
            },
            {
                token: "keyword",
                regex: selectDependentKeywordsRegex,
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            }
        ],
        "insert_state": [
            {
                token: "comment.start", // multi-line comment
                regex: "\\/\\*",
                push: [
                    {
                        token: "comment.end",
                        regex: "\\*\\/",
                        next: "pop"
                    }, {
                        defaultToken: "comment"
                    }
                ]
            },
            {
                token: "comment",
                regex: "\\/\\/.*$"
            },
            {
                token: "paren.quasi.start",
                regex: "(?<=JSON)(\\S?|\\s|\\n) \\'",
                next: "json-start"
            },
            {
                token: "string", // single line string
                regex: /(["'])(?:(?=(\\?))\2.)*?\1/
            },
            {
                token: 'constant.numeric', // hexadecimal, octal and binary
                regex: /\b0[xX][0-9a-fA-F]+\b|\b0[oO][0-7]+\b|\b0[bB][01]+\b/
            }, {
                token: 'constant.numeric', // decimal integers and floats
                regex: /\b\d+(\.\d+)?\b/
            },
            {
                token: "constant.language.parameter",
                regex: updateParameterRegex,
                caseInsensitive: true
            },
            {
                token: 'constant.language.datatype', // decimal integers and floats
                regex: dataTypeRegex,
                caseInsensitive: true
            },
            {
                token: "constant.language", // single line string
                regex: dataManipulationRegex
            },
            {
                token: "keyword",
                regex: insertDependentKeywordsRegex,
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            }
        ],
        "create_table_state": [
            basicDataHighlighting,
            {
                token: "constant.language", // single line string
                regex: dataDefinitionRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            },
            {
                token: "variable",
                regex: createTableRegex,
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            }
        ],
        "update_state": [
            basicDataHighlighting,
            {
                token: "constant.language.parameter",
                regex: updateParameterRegex,
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            }
        ],
        "alter_table_state": [
            basicDataHighlighting,
            {
                token: "constant.language", // single line string
                regex: dataDefinitionRegex,
                caseInsensitive: true
            },
            {
                token: "variable",
                regex: alterTableRegex,
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            }
        ],
        "create_or_alter_keyspace_state": [
            basicDataHighlighting,
            {
                token: "variable",
                regex: createKeyspaceRegex
            },
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            }
        ],
        "delete_state": [
            basicDataHighlighting,
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            }
        ],
        "batch_state": [
            basicDataHighlighting,
            {
                token: "keyword",
                regex: adjustedReservedKeywordRegex,
                caseInsensitive: true
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            }
        ]
    };
    this.normalizeRules();
    this.embedRules(Json5HighlightRules, "json-", [
        {
            token: "paren.quasi.end",
            regex: "\\'",
            next: "insert_state"
        }
    ]);
};
oop.inherits(CQLHighlightRules, TextHighlightRules);
exports.CQLHighlightRules = CQLHighlightRules;

});

ace.define("ace/mode/cql",[], function(require, exports, module){var oop = require("../lib/oop");
var TextMode = require("../mode/text").Mode;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var CQLHighlightRules = require("./cql_highlight_rules").CQLHighlightRules;
var Mode = function () {
    this.HighlightRules = CQLHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);
(function () {
    this.getNextLineIndent = function (state, line, tab) {
        return this.$getIndent(line);
    };
    this.$id = "ace/mode/cql";
}).call(Mode.prototype);
exports.Mode = Mode;

});
                (function() {
                    ace.require(["ace/mode/cql"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            