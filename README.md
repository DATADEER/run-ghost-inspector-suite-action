# Run Ghost Inspector Suite 

Run a Ghost Inspector Suite that only passes if both assertions and screenshots don't fail.

## Inputs



### `suiteID`
**Required** ghost inspector suiteID.\
*If you want to get a link to the suite after tests are failing you should add this as a literal string and not as a secret.* \
default: 'UNDEFINED'

### `GHOST_INSPECTOR_API_KEY`
**Required** ghost inspector API Key\
default: 'UNDEFINED'

### `startURL`
optional startURL for the test suite\
default: ''

### `maxTimeout`
optional timeout in milliseconds. how long to wait for tests results before failing\
default: "300000"


## Outputs
This Action doesn't have any output yet.


## Example usage

```yml
uses: DATADEER/run-ghost-inspector-suite-action@v1.1
with:
  suiteID: "XXXXXXXXXXXXXXXXXXXXXXX" # don't import from secrets. needs to visible in logs
  startURL: "https://google.com"
  GHOST_INSPECTOR_API_KEY: ${{ secrets.GHOST_INSPECTOR_API_KEY }}
```
