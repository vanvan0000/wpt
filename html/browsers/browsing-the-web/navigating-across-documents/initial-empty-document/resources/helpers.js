// Returns a promise that asserts |event| is fired exactly |expectedCount|
// times on |target| asynchronously.
function assertEventFired(t, event, target, expectedCount) {
  let eventCount = 0;
  target.addEventListener(event, t.step_func(() => {
    eventCount++;
  }));
  return new Promise(resolve => {
    // Wait 100ms to ensure events fired after asynchronous navigations are
    // also captured.
    setTimeout(() => {
      t.step(() => {
        assert_equals(eventCount, expectedCount);
      });
      resolve();
    }, 100);
  });
}
