import binascii
import sys
import json
import time

import Adafruit_PN532 as PN532
import Adafruit_GPIO as GPIO
import RPi.GPIO

# COMMANDS TO BE RECEIVED FORM TERMINAL
INIT = "init"
EXIT = "exit"

CS   = 8
MOSI = 7
MISO = 18
SCLK = 22

print("python begin")
pn532 = PN532.PN532(cs=CS, sclk=SCLK, mosi=MOSI, miso=MISO,gpio = GPIO.RPiGPIOAdapter(RPi.GPIO,RPi.GPIO.BOARD))
pn532.begin()
# Get the firmware version from the chip and print(it out.)
ic, ver, rev, support = pn532.get_firmware_version()
print('Found PN532 with firmware version: {0}.{1}'.format(ver, rev))
# Configure PN532 to communicate with MiFare cards.
pn532.SAM_configuration()

# Main loop to detect cards and read a block.
print('Waiting for MiFare card...')
while True:
    # Check if a card is available to read.
    uid = pn532.read_passive_target()
    # Try again if no card is available.
    if uid is None:
        continue
    print('Found card with UID: 0x{0}'.format(binascii.hexlify(uid)))
    # Authenticate block 4 for reading with default key (0xFFFFFFFFFFFF).
    if not pn532.mifare_classic_authenticate_block(uid, 4, PN532.MIFARE_CMD_AUTH_B,
                                                   [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]):
        print('Failed to authenticate block 4!')
        continue
    # Read block 4 data.
    data = pn532.mifare_classic_read_block(4)
    if data is None:
        print('Failed to read block 4!')
        continue
    # Note that 16 bytes are returned, so only show the first 4 bytes for the block.
    print('Read block 4: 0x{0}'.format(binascii.hexlify(data[:4])))
    time.sleep(15)
