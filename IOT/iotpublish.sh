#! /bin/sh
# /etc/init.d/iotpublish
#

### BEGIN INIT INFO
# Provides:          iotpublidh
# Required-Start:    $local_fs
# Required-Stop:     
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Publish temperature on Amazon IOT
# Description:       Get temperature from the card and send it back to AMAZON IOT.
### END INIT INFO


# I skipped $network

case "$1" in
  start)
    /usr/bin/node /home/pi/IOT/index.js >/home/pi/IOT/log.tra 2>&1 &
    echo "$! started at " `date` >>/home/pi/IOT/pid.tra
    ;;
  stop)
   echo "--- stop at " `date` >>/home/pi/IOT/pid.tra
   ;;
  *)
   ;;
esac
exit 0
