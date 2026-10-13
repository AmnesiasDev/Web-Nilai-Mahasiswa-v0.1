import { useState } from "react";

const dataNilai = {
  "Danil Meikova": { password: "Danil123", nilai: 97 },
  "Monica": { password: "KucingPutih", nilai: 80 },
  "101223": { password: "101223via", nilai: 71 },
  "101224": { password: "101224via", nilai: 65 },
};

function tentukanGrade(nilai) {
  if (nilai >= 90) return "Semangat Sayang UTBK-nya";
  if (nilai >= 80) return "Afh Kabar Kak";
  if (nilai >= 70) return "C";
  if (nilai >= 60) return "D";
  return "E";
}

export default function App() {
  const [npm, setNpm] = useState("");
  const [password, setPassword] = useState("");
  const [lihatPassword, setLihatPassword] = useState(false);
  const [kesempatan, setKesempatan] = useState(3);
  const [pesan, setPesan] = useState("");
  const [hasil, setHasil] = useState(null);

  const diblokir = kesempatan === 0;

  function login(event) {
    event.preventDefault();
    if (diblokir) return;

    const npmBersih = npm.trim();
    const data = dataNilai[npmBersih];

    if (data && data.password === password) {
      setHasil({
        npm: npmBersih,
        nilai: data.nilai,
        grade: tentukanGrade(data.nilai),
      });
      setPesan("");
      return;
    }

    const sisa = kesempatan - 1;
    setKesempatan(sisa);
    setPassword("");
    setPesan(
      sisa > 0
        ? `Nama atau password salah. Sisa kesempatan: ${sisa}`
        : "Kesempatan login habis. Akses diblokir."
    );
  }

  function reset() {
    setNpm("");
    setPassword("");
    setKesempatan(3);
    setPesan("");
    setHasil(null);
    setLihatPassword(false);
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="logo" aria-hidden="true">🎓</div>
        <p className="eyebrow">MASIH DALAM PERKEMBANGAN PUH</p>
        <h1>Portal Nilai Mahasiswa</h1>
        <p className="subtitle">
          Masukkan Nama dan password untuk melihat nilai serta grade.
        </p>
        <div className="attempts">
          Kesempatan login tersisa: <strong>{kesempatan}</strong>
        </div>
      </section>

      <section className="card">
        {!hasil ? (
          <>
            <h2>Login Mahasiswa</h2>
            <p className="muted">Silakan isi data akun dengan benar.</p>

            <form onSubmit={login}>
              <label htmlFor="npm">Nama</label>
              <input
                id="npm"
                value={npm}
                onChange={(event) => setNpm(event.target.value)}
                placeholder="Contoh: 101221"
                autoComplete="username"
                disabled={diblokir}
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={lihatPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  disabled={diblokir}
                  required
                />
                <button
                  className="show-password"
                  type="button"
                  onClick={() => setLihatPassword(!lihatPassword)}
                  aria-label={lihatPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {lihatPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {pesan && <div className="alert">{pesan}</div>}

              <button className="primary" type="submit" disabled={diblokir}>
                Login
              </button>

              {diblokir && (
                <button className="secondary" type="button" onClick={reset}>
                  Reset simulasi
                </button>
              )}
            </form>
          </>
        ) : (
          <div className="result">
            <div className="success">Login berhasil 🎉</div>
            <h2>Data Nilai</h2>
            <div className="result-grid">
              <div className="result-box">
                <span>NPM</span>
                <strong>{hasil.npm}</strong>
              </div>
              <div className="result-box">
                <span>Nilai</span>
                <strong>{hasil.nilai}</strong>
              </div>
              <div className="grade-box">
                <span>Grade</span>
                <strong>{hasil.grade}</strong>
              </div>
            </div>
            <button className="secondary" type="button" onClick={reset}>
              Keluar
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
