#!/bin/bash

cd src/wasm

wasm-pack build --target web
# wasm-pack build --target bundler
