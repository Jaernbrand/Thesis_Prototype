
BUILD_DIR=build

BUILD_NAME="ThesisPrototype.mini.js"

SRC_FILES=TextArea.js SimpleText.js

$(BUILD_DIR)/$(BUILD_NAME): 
	mkdir -p $(BUILD_DIR)
	uglifyjs $(SRC_FILES) -o $@
