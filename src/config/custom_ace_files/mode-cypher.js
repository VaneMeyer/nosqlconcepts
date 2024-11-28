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

ace.define("ace/mode/cypher_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var CypherDBHighlightRules = function () {
    var allFunctions = (
    "all|any|exists|isEmpty|none|single|" +
        "char_length|character_length|coalesce|elementId|" +
        "endNode|head|id|last|length|nullIf|properties|randomUUID|size|startNode|toBoolean|toBooleanOrNull|" +
        "toFloat|toFloatOrNull|toInteger|toIntegerOrNull|type|valueType|" +
        "avg|collect|count|max|min|percentileCont|percentileDisc|stdev|stdevp|sum|" +
        "keys|labels|nodes|range|reduce|relationships|reverse|tail|toBooleanList|toFloatList|" +
        "toIntegerList|toStringList|" +
        "abs|ceil|floor|isNaN|rand|round|sign|" +
        "e|exp|log|log10|sqrt|" +
        "acos|asin|atan|atan2|cos|cot|degrees|haversin|pi|radians|sin|tan|" +
        "btrim|left|ltrim|normalize|replace|reverse|right|rtrim|split|substring|toLower|toString|toStringOrNull|" +
        "toUpper|trim|" +
        "date|date.realtime|date.statement|date.transaction|date.truncate|datetime|datetime.fromepoch|" +
        "datetime.fromepochmillis|datetime.realtime|datetime.statement|datetime.transaction|datetime.truncate|" +
        "localdatetime|localdatetime.realtime|localdatetime.statement|localdatetime.transaction|localdatetime.truncate|" +
        "localtime|localtime.realtime|localtime.statement|localtime.transaction|localtime.truncate|time|" +
        "time.realtime|time.statement|time.transaction|time.truncate|" +
        "duration|duration.between|duration.inDays|duration.inMonths|duration.inSeconds|" +
        "point.distance|point|point.withinBBox|vector.similarity.euclidean|vector.similarity.cosine|" +
        "file|linenumber|" +
        "graph.byElementId|graph.byName|graph.names|graph.propertiesByName|db.nameFromElementId|genai.vector.encode");
    var mainClauses = ("CALL|CREATE|DELETE|DETACH|FOREACH|LOAD|MATCH|MERGE|OPTIONAL|REMOVE|RETURN|SET|START|" +
        "UNION|UNWIND|WITH");
    var subClauses = ("LIMIT|ORDER BY|SKIP|WHERE|YIELD");
    var clauses = mainClauses + subClauses;
    var expressions = ("ALL|CASE|COUNT|ELSE|END|EXISTS|THEN|WHEN|" +
        "CONSTRAINT|CREATE|DROP|EXISTS|INDEX|NODE|KEY|UNIQUE|INDEX|JOIN|SCAN|USING");
    var operators = ("AND|AS|CONTAINS|DISTINCT|ENDS|IN|IS|NOT|OR|STARTS|XOR");
    var constants = ("false|null|true|ASC|ASCENDING|ASSERT|BY|CSV|DESC|DESCENDING|ON");
    var functionRegex = "\\b(" + allFunctions + ")\\b";
    var mainClausesRegex = "\\b(" + mainClauses + ")\\b";
    var clausesRegex = "\\b(" + clauses + ")\\b";
    var operatorsRegex = "\\b(" + operators + ")\\b";
    var constantsRegex = "\\b(" + constants + ")\\b";
    function getNextState(originState) {
        return function (currentState, stack) {
            if (stack.length > 0) {
                stack.pop();
                return originState;
            }
            else {
                return originState;
            }
        };
    }
    function nestTheState(nextState) {
        return function (currentState, stack) {
            stack.push(currentState);
            return nextState;
        };
    }
    var basicDataHighlighting = [
        {
            token: "comment",
            regex: "\\/\\/.*$"
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
        }, {
            token: "string", // single line string
            regex: /(["'])(?:(?=(\\?))\2.)*?\1/
        },
        {
            token: 'constant.numeric', // hexadecimal, octal and binary
            regex: /\b0[xX][0-9a-fA-F]+\b|\b0[oO][0-7]+\b|\b0[bB][01]+\b/
        }, {
            token: 'constant.numeric', // decimal integers and floats
            regex: /\b\d+(\.\d+)?\b/
        }
    ];
    this.$rules = {
        "start": [
            basicDataHighlighting,
            {
                token: "keyword",
                regex: mainClausesRegex,
                next: "clause_state",
                caseInsensitive: true
            },
            {
                token: "constant.language", // single line string
                regex: constantsRegex
            }
        ],
        "clause_state": [
            basicDataHighlighting,
            {
                token: "support.function",
                regex: functionRegex + "(?=\\()",
                next: [
                    {
                        token: "paren.quasi.start",
                        regex: "\\(",
                        next: nestTheState("clause_state")
                    }
                ]
            },
            {
                token: "paren.quasi.start",
                regex: "\\(",
                next: "node_state"
            },
            {
                token: "paren.quasi.end",
                regex: "\\)",
                next: getNextState('clause_state')
            },
            {
                token: "paren.quasi.end",
                regex: "\\[",
                next: "relation_state"
            },
            {
                token: "endStatement",
                regex: "\\;",
                next: "start"
            },
            {
                token: "keyword",
                regex: clausesRegex,
                caseInsensitive: true
            },
            {
                token: "keyword.operator",
                regex: operatorsRegex,
                caseInsensitive: true
            },
            {
                token: "constant.language", // single line string
                regex: constantsRegex,
                caseInsensitive: true
            }
        ],
        "node_state": [
            basicDataHighlighting,
            {
                token: "paren.quasi.end",
                regex: "\\)",
                next: "clause_state"
            },
            {
                token: "entity.other.attribute",
                regex: "(?<=\\:)[_a-zA-Z][-a-zA-Z0-9]*"
            }, {
                token: "keyword.operator",
                regex: operatorsRegex,
                caseInsensitive: true
            },
            {
                token: "keyword",
                regex: clausesRegex,
                caseInsensitive: true
            }
        ],
        "relation_state": [
            basicDataHighlighting,
            {
                token: "paren.quasi.end",
                regex: "\\]",
                next: "clause_state"
            },
            {
                token: "entity.other.attribute",
                regex: "(?<=\\:)[a-zA-Z]([-_]?[a-zA-Z0-9])*"
            },
            {
                token: "keyword",
                regex: clausesRegex,
                caseInsensitive: true
            }
        ]
    };
    this.normalizeRules();
};
oop.inherits(CypherDBHighlightRules, TextHighlightRules);
exports.CypherDBHighlightRules = CypherDBHighlightRules;

});

ace.define("ace/mode/cypher",[], function(require, exports, module){var oop = require("../lib/oop");
var TextMode = require("../mode/text").Mode;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var CypherHighlightRules = require("./cypher_highlight_rules").CypherDBHighlightRules;
var Mode = function () {
    this.HighlightRules = CypherHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);
(function () {
    this.getNextLineIndent = function (state, line, tab) {
        return this.$getIndent(line);
    };
    this.$id = "ace/mode/cypher";
}).call(Mode.prototype);
exports.Mode = Mode;

});
                (function() {
                    ace.require(["ace/mode/cypher"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            