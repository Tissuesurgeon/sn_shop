#!/bin/sh
# Migrations use DIRECT_URL. On Vercel that variable is often unset, so fall back to DATABASE_URL.
if [ -z "$DIRECT_URL" ]; then
  export DIRECT_URL="$DATABASE_URL"
fi
exec "$@"
