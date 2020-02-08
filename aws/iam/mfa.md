# MFAを必須にする

`Condition`に以下を追加

    "Condition": {
    	"BoolIfExists": {
    		"aws:MultiFactorAuthPresent": "true"
    	}
    }