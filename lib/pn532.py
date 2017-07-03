import binascii
import sys
import json
import time

import Adafruit_PN532 as PN532

# COMMANDS TO BE RECEIVED FORM TERMINAL
INIT = "init"
EXIT = "exit"

CS   = 18
MOSI = 23
MISO = 24
SCLK = 25

print json.dumps({ 'message': 'begining', 'code': 1 })


if __name__ == '__main__':
    while True:
        data = raw_input()
        if data is not None:
            d = json.loads(data)
            command = d["command"]
            if(command == EXIT): #{"command":"exit"}
                print("python: exit")
                break

            elif(command == INIT): #{"command":"begin"}
                print json.dumps({ 'message': 'init', 'code': 2 })
                pn532 = PN532.PN532(cs=(d["CS"] or CS), sclk=(d["SCLK"] or SCLK), mosi=(d["MOSI"] or MOSI), miso=(d["MISO"] or MISO))
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

                # Main loop to detect cards and read a block.
                while True:
                    # Check if a card is available to read.
                    uid = pn532.read_passive_target()
                    # Try again if no card is available.
                    if uid is None:
                        continue

                    print json.dumps({ 'message': 'card found', 'code': 4, 'data': {
                        'uid': uid.decode('utf-8'),
                    }})
                    time.sleep(0.5)
