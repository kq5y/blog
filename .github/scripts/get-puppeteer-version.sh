#!/bin/bash

cat package.json| grep "\"puppeteer\"" | head -n 1 | tr -d ' \":,' | tr -d 'puppeteer'
