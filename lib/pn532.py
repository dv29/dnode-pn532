import binascii
import sys
import time
import PN532

SCAN_TIMEOUT = 1

if len(sys.argv) > 1:
    SCAN_TIMEOUT = float(sys.argv[1])

if len(sys.argv) > 2:
    INTERFACE = sys.argv[2]

time.sleep(2)

pn532 = PN532.PN532(INTERFACE,115200)

pn532.begin()

while True:
    # Check if a card is available to read.
    uid = pn532.read_passive_target()

    # Try again if no card is available.
    if uid is not None:
        print json.dumps({ 'message': 'Card Found', 'code': 4, 'data': {
        'uid': binascii.hexlify(uid),
        }})
        sys.stdout.flush()

    time.sleep(SCAN_TIMEOUT)
