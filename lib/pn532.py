import binascii
import sys
import json
import time

import Adafruit_PN532 as PN532

CS   = 18
MOSI = 23
MISO = 24
SCLK = 25

if len(sys.argv) > 1:
    CS   = int(sys.argv[1])
    MOSI = int(sys.argv[2])
    MISO = int(sys.argv[3])
    SCLK = int(sys.argv[4])

time.sleep(2)
print json.dumps({ 'message': 'init', 'code': 1 })

# initialize pn532 python
pn532 = PN532.PN532(cs=CS, sclk=SCLK, mosi=MOSI, miso=MISO)

# begin pn532 operations
pn532.begin()

# Get the firmware version from the chip and print(it out.)
ic, ver, rev, support = pn532.get_firmware_version()
print json.dumps({ 'message': 'firmware version', 'code': 3, 'data': {
    'ic': ic,
    'ver': ver,
    'rev': rev,
    'support': support
}})

# Configure PN532 to communicate with MiFare cards.
pn532.SAM_configuration()
sys.stdout.flush()
# Main loop to detect cards and read a block.
while True:
    # Check if a card is available to read.
    uid = pn532.read_passive_target()

    # Try again if no card is available.
    if uid is not None:
        print json.dumps({ 'message': 'card found', 'code': 4, 'data': {
        'uid': binascii.hexlify(uid),
        }})
        sys.stdout.flush()

    time.sleep(0.5)
