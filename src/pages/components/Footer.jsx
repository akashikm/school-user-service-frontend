
function Footer() {

  return (
    <div className="flex justify-between items-center flex-wrap text-sm text-gray-600 px-4 py-2">
  <div className="text-center md:text-left w-full md:w-auto">
    <h4>Developed by Information Kerala Mission KSMART School</h4>
  </div>
  <div className="w-full md:w-auto text-center md:text-right mt-2 md:mt-0">
    <a href="/terms" className="mx-2 hover:underline">Terms and Conditions</a>
    <a href="/privacy" className="mx-2 hover:underline">Privacy Policy</a>
  </div>
</div>

  )
}
export default Footer;