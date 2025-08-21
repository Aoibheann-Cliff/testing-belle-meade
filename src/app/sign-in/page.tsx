import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { auth } from "./actions";
import Image from "next/image";
import logoType from "../logotype.svg";
import signInArrow from "../sign-in-arrow.svg";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignIn(props: Props) {
  const searchParams = await props.searchParams;
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect("/");
  }

  // check if error query param exists
  const error = searchParams.error;

  return (
    <div className="login-form-container">
      <div className="logotype" id="logotype">
        <Image src={logoType} alt="logotype" />
      </div>
      <div className="ipad-logotype" id="ipadlogotype">
        <Image src={logoType} alt="logotype" />
      </div>

      <form className="login-form" action={auth}>
        <input
          name="redirect"
          type="hidden"
          defaultValue={searchParams.redirect as string}
        />
        <label>
          <input
            placeholder="Enter Password"
            name="password"
            type="password"
            required
            autoFocus
          />
        </label>
        <button type="submit">
          <Image src={signInArrow} alt="arrow" />
        </button>
      </form>

      {/* show error if password was wrong */}
      {error && (
        <p className="error-message">
          Incorrect password. Please try again.
        </p>
      )}

      <h3>
        If you require a password, we invite you to <a href="">contact us</a>.
      </h3>
    </div>
  );
}
