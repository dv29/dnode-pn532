import binascii
import sys
import time
import PN532

pn532 = PN532.PN532("/dev/ttyUSB0",115200)

pn532.begin()

pn532.SAM_configuration()

# Get the firmware version from the chip and print(it out.)
ic, ver, rev, support = pn532.get_firmware_version()

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
