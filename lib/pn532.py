import binascii
import sys
import time
import json
from PN532 import PN532

SCAN_TIMEOUT = 1
INTERFACE = "/dev/ttyS2"

if len(sys.argv) > 1:
    SCAN_TIMEOUT = float(sys.argv[1])

if len(sys.argv) > 2:
    INTERFACE = sys.argv[2]

time.sleep(2)

pn532 = PN532.PN532(INTERFACE,115200)

pn532.begin()

print json.dumps({ 'message': 'Initialized', 'code': 1 })

pn532.SAM_configuration()

sys.stdout.flush()

while True:
    # Check if a card is available to read.
    uid = pn532.read_passive_target()

    # Try again if no card is available.
    if uid is "no_card":
        continue

    print json.dumps({ 'message': 'Card Found', 'code': 4, 'data': {
    'uid': binascii.hexlify(uid),
    }})
    sys.stdout.flush()

    time.sleep(SCAN_TIMEOUT)
