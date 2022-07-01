export default function (context) {
  if (!context.store.state.user.hakAkses.length) {
    console.log('to landingpage')
    context.redirect('/')
  }
}
