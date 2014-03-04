#
# This Makefile builds a single JavaScript file from multiple source files.
#


TOOLS_DIR = lib
DOC_TOOLS_DIR = $(TOOLS_DIR)

COMPILER = $(TOOLS_DIR)/compiler.jar
COMPILE = java -jar $(COMPILER)

SRC_DIR = src
LIB_DIR = lib

SRCS = qmonix.js\
	exceptions/exceptions.js\
	exceptions/Exception.js\
	exceptions/IllegalEventStateException.js\
	exceptions/TimeIntervalException.js\
	exceptions/UninitializedTrackerException.js\
	exceptions/BadArgumentException.js\
	utils/utils.js\
	utils/Utils.js\
	TimeInterval.js\
	EventMessage.js\
	EventDispatcher.js\
	DefaultEventDispatcher.js\
	Event.js\
	VolumeEvent.js\
	TimingEvent.js\
	Tracker.js

LIBS = json2.js\
	debug.js

COMPILE_SRCS = ${addprefix --js=$(SRC_DIR)/, $(SRCS)}
LIBS_SRCS = ${addprefix --js=$(LIB_DIR)/, $(LIBS)}

OUTPUT_FILE_NAME = Qmonix.js
BUILD_DIR = ./build

COMPILE_OPTIMIZATIONS = ADVANCED_OPTIMIZATIONS
COMPILER_FLAGS = --compilation_level $(COMPILE_OPTIMIZATIONS) \
	--js_output_file=$(BUILD_DIR)/$(OUTPUT_FILE_NAME) \
	--output_wrapper "(function() {%output%})();"

all: compile
.PHONY: all

compile: $(BUILD_DIR)
	$(COMPILE) $(LIBS_SRCS) $(COMPILE_SRCS) $(COMPILER_FLAGS)
.PHONY: compile


$(BUILD_DIR):
	mkdir -p $@


clean:
	rm -rf $(BUILD_DIR)
.PHONY: clean
