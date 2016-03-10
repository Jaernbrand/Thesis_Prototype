
BUILD_DIR=build
DOC_DIR=doc

BUILD_NAME="ThesisPrototype.mini.js"

BUILD=$(BUILD_DIR)/$(BUILD_NAME)

JS_SRC_DIR=js
JS_SRC_FILES=$(JS_SRC_DIR)/Database.js $(JS_SRC_DIR)/EventConfig.js $(JS_SRC_DIR)/game.js \
			$(JS_SRC_DIR)/SimpleText.js $(JS_SRC_DIR)/UserTestSetup.js

.PHONY: all clean doc install

$(BUILD): 
	mkdir -p $(BUILD_DIR)
	uglifyjs $(JS_SRC_FILES) -o $@

all: doc $(BUILD)

clean:
	rm -rf $(BUILD_DIR) $(DOC_DIR)

doc: 
	mkdir -p $(DOC_DIR)
	jsdoc $(JS_SRC_FILES) -d $(DOC_DIR)

# Requires the variable 'location' to be set.
# Use the target as follows:
# make install location=<location directory>
install:
	@if [[ -n $$location ]]; \
	then \
		cp -r assets $(location)/; \
		cp -r css $(location)/; \
		cp -r js $(location)/; \
		cp index.html $(location)/; \
		echo "Installed at '$$location'."; \
	else \
		echo "Variable location not set."; \
		echo "Usage:"; \
		echo "make install location=<location directory>"; \
		echo ""; \
	fi
