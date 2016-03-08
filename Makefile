
BUILD_DIR=build
DOC_DIR=doc

BUILD_NAME="ThesisPrototype.mini.js"

BUILD=$(BUILD_DIR)/$(BUILD_NAME)

JS_SRC_DIR=js
JS_SRC_FILES=$(JS_SRC_DIR)/Database.js $(JS_SRC_DIR)/EventConfig.js $(JS_SRC_DIR)/game.js \
			$(JS_SRC_DIR)/SimpleText.js $(JS_SRC_DIR)/Setup.js

.PHONY: all clean doc

$(BUILD): 
	mkdir -p $(BUILD_DIR)
	uglifyjs $(JS_SRC_FILES) -o $@

all: doc $(BUILD)

clean:
	rm -rf $(BUILD) $(DOC_DIR)

doc: 
	mkdir -p $(DOC_DIR)
	jsdoc $(JS_SRC_FILES) -d $(DOC_DIR)
