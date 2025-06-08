import { MapPin, Clock } from "lucide-react";

const TrainingSchedule = () => {
  return (
    <section className="py-16 px-6 bg-muted">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-1 gap-10 items-center">
        {/* TEXT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Jadwal & Lokasi Latihan
          </h2>

          <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-1 text-primary" />
              <p>
                <span className="font-semibold text-foreground">Jadwal:</span>{" "}
                Setiap Hari Minggu pukul 08.30 – 12.00 WIB
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-1 text-primary" />
              <p>
                <span className="font-semibold text-foreground">Lokasi:</span>{" "}
                Stadion Bola Mini Cijantung, Jakarta Timur
              </p>
            </div>
          </div>
        </div>

        {/* MAP EMBED */}
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-muted">
          <iframe
            className="w-full h-72 md:h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120618.9968994036!2d106.70132059726558!3d-6.321890999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edc5ab5abaa7%3A0xb0b14c40c0b8832b!2sStadion%20Bola%20Mini%20Cijantung!5e1!3m2!1sid!2sid!4v1746005221695!5m2!1sid!2sid"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default TrainingSchedule;
